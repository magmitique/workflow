import type { PrismaClient } from '../../generated/prisma/index.js';
import type { CaseStudyCreateInput, CaseStudyUpdateInput, CaseStudyListQuery } from '@apio/shared';

export class CaseStudyService {
  constructor(private prisma: PrismaClient) {}

  async listPublished(query: CaseStudyListQuery) {
    const { page, limit, sector, featured, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where = {
      status: 'PUBLISHED' as const,
      deletedAt: null,
      ...(sector && { sector }),
      ...(featured !== undefined && { featured }),
    };

    const [caseStudies, total] = await Promise.all([
      this.prisma.caseStudy.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { results: true },
      }),
      this.prisma.caseStudy.count({ where }),
    ]);

    return {
      data: caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async listAll(query: CaseStudyListQuery) {
    const { page, limit, sector, featured, sortBy, sortOrder, status, deleted } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      deletedAt: deleted ? { not: null } : null,
      ...(sector && { sector }),
      ...(featured !== undefined && { featured }),
    };

    const [caseStudies, total] = await Promise.all([
      this.prisma.caseStudy.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { results: true },
      }),
      this.prisma.caseStudy.count({ where }),
    ]);

    return {
      data: caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getBySlug(slug: string) {
    return this.prisma.caseStudy.findUnique({
      where: { slug, deletedAt: null },
      include: { results: true },
    });
  }

  async create(data: CaseStudyCreateInput) {
    const { results, ...caseStudyData } = data;

    return this.prisma.$transaction(async (tx) => {
      const caseStudy = await tx.caseStudy.create({
        data: caseStudyData,
      });

      if (results && results.length > 0) {
        await tx.caseStudyResult.createMany({
          data: results.map((r) => ({
            caseStudyId: caseStudy.id,
            metric: r.metric,
            before: r.before,
            after: r.after,
          })),
        });
      }

      return this.getById(tx, caseStudy.id);
    });
  }

  async update(id: string, data: CaseStudyUpdateInput) {
    const { results, coverImage, architectureDiagram, ...caseStudyData } = data;
    const orphanedImages: string[] = [];

    const caseStudy = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.caseStudy.findUniqueOrThrow({ where: { id } });

      // Track images that are being replaced or removed
      if (coverImage !== undefined && existing.coverImage && existing.coverImage !== coverImage) {
        orphanedImages.push(existing.coverImage);
      }
      if (
        architectureDiagram !== undefined &&
        existing.architectureDiagram &&
        existing.architectureDiagram !== architectureDiagram
      ) {
        orphanedImages.push(existing.architectureDiagram);
      }

      await tx.caseStudy.update({
        where: { id },
        data: {
          ...caseStudyData,
          ...(coverImage !== undefined && { coverImage: coverImage || null }),
          ...(architectureDiagram !== undefined && {
            architectureDiagram: architectureDiagram || null,
          }),
        },
      });

      if (results !== undefined) {
        await tx.caseStudyResult.deleteMany({ where: { caseStudyId: id } });
        if (results.length > 0) {
          await tx.caseStudyResult.createMany({
            data: results.map((r) => ({
              caseStudyId: id,
              metric: r.metric,
              before: r.before,
              after: r.after,
            })),
          });
        }
      }

      return this.getById(tx, id);
    });

    return { caseStudy, orphanedImages };
  }

  async getByIdPublic(id: string) {
    return this.prisma.caseStudy.findUniqueOrThrow({
      where: { id },
      include: { results: true },
    });
  }

  async softDelete(id: string) {
    await this.prisma.caseStudy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    await this.prisma.caseStudy.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async hardDelete(id: string) {
    const caseStudy = await this.prisma.caseStudy.findUniqueOrThrow({ where: { id } });
    await this.prisma.caseStudy.delete({ where: { id } });
    const imageUrls: string[] = [];
    if (caseStudy.coverImage) imageUrls.push(caseStudy.coverImage);
    if (caseStudy.architectureDiagram) imageUrls.push(caseStudy.architectureDiagram);
    return imageUrls;
  }

  private async getById(
    tx: Parameters<Parameters<PrismaClient['$transaction']>[0]>[0],
    id: string
  ) {
    return tx.caseStudy.findUniqueOrThrow({
      where: { id },
      include: { results: true },
    });
  }
}
