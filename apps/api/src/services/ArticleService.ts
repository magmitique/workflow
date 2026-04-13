import type { PrismaClient } from '../../generated/prisma/index.js';
import type { ArticleCreateInput, ArticleUpdateInput, ArticleListQuery } from '@apio/shared';
import { slugify } from '@apio/shared';

export class ArticleService {
  constructor(private prisma: PrismaClient) {}

  async listPublished(query: ArticleListQuery) {
    const { page, limit, tag, search, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where = {
      status: 'PUBLISHED' as const,
      deletedAt: null,
      ...(tag && {
        tags: { some: { tag: { slug: tag } } },
      }),
      ...(search && {
        OR: [{ title: { contains: search } }, { excerpt: { contains: search } }],
      }),
    };

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          author: { select: { id: true, name: true } },
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data: articles.map((a) => ({
        ...a,
        tags: a.tags.map((t) => t.tag),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async listAll(query: ArticleListQuery) {
    const { page, limit, tag, search, sortBy, sortOrder, status, deleted } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      deletedAt: deleted ? { not: null } : null,
      ...(tag && {
        tags: { some: { tag: { slug: tag } } },
      }),
      ...(search && {
        OR: [{ title: { contains: search } }, { excerpt: { contains: search } }],
      }),
    };

    const [articles, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          author: { select: { id: true, name: true } },
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data: articles.map((a) => ({
        ...a,
        tags: a.tags.map((t) => t.tag),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug, deletedAt: null },
      include: {
        author: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!article) return null;

    return {
      ...article,
      tags: article.tags.map((t) => t.tag),
    };
  }

  async create(data: ArticleCreateInput, authorId: string) {
    const { tags: tagNames, ...articleData } = data;

    return this.prisma.$transaction(async (tx) => {
      const article = await tx.article.create({
        data: {
          ...articleData,
          authorId,
          publishedAt: articleData.status === 'PUBLISHED' ? new Date() : null,
        },
      });

      if (tagNames && tagNames.length > 0) {
        await this.upsertTags(tx, article.id, tagNames);
      }

      return this.getById(article.id, tx);
    });
  }

  async update(id: string, data: ArticleUpdateInput) {
    const { tags: tagNames, coverImage, ...articleData } = data;
    const orphanedImages: string[] = [];

    const article = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.article.findUniqueOrThrow({ where: { id } });

      // Track images that are being replaced or removed
      if (coverImage !== undefined && existing.coverImage && existing.coverImage !== coverImage) {
        orphanedImages.push(existing.coverImage);
      }

      await tx.article.update({
        where: { id },
        data: {
          ...articleData,
          ...(coverImage !== undefined && { coverImage: coverImage || null }),
          ...(articleData.status === 'PUBLISHED' && !existing.publishedAt
            ? { publishedAt: new Date() }
            : {}),
        },
      });

      if (tagNames !== undefined) {
        await tx.articleTag.deleteMany({ where: { articleId: id } });
        if (tagNames.length > 0) {
          await this.upsertTags(tx, id, tagNames);
        }
      }

      return this.getById(id, tx);
    });

    return { article, orphanedImages };
  }

  async softDelete(id: string) {
    await this.prisma.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    await this.prisma.article.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async hardDelete(id: string) {
    const article = await this.prisma.article.findUniqueOrThrow({ where: { id } });
    await this.prisma.article.delete({ where: { id } });
    const imageUrls: string[] = [];
    if (article.coverImage) imageUrls.push(article.coverImage);
    return imageUrls;
  }

  async getById(id: string, client?: Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]) {
    const db = client ?? this.prisma;
    const article = await db.article.findUniqueOrThrow({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        tags: { include: { tag: true } },
      },
    });

    return {
      ...article,
      tags: article.tags.map((t) => t.tag),
    };
  }

  private async upsertTags(
    tx: Parameters<Parameters<PrismaClient['$transaction']>[0]>[0],
    articleId: string,
    tagNames: string[]
  ) {
    for (const name of tagNames) {
      const tagSlug = slugify(name);
      const tag = await tx.tag.upsert({
        where: { slug: tagSlug },
        create: { name, slug: tagSlug },
        update: {},
      });
      await tx.articleTag.create({
        data: { articleId, tagId: tag.id },
      });
    }
  }
}
