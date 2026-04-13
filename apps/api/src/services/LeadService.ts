import type { PrismaClient } from '../../generated/prisma/index.js';
import type { ContactFormInput, LeadListQuery, LeadStatus } from '@apio/shared';

export class LeadService {
  constructor(private prisma: PrismaClient) {}

  async createFromContact(data: ContactFormInput) {
    return this.prisma.lead.create({
      data: {
        email: data.email,
        firstName: data.firstName ?? null,
        lastName: data.lastName ?? null,
        phone: data.phone ?? null,
        company: data.company ?? null,
        companySize: data.companySize ?? null,
        sector: data.sector ?? null,
        needType: data.needType ?? null,
        budgetRange: data.budgetRange ?? null,
        timeline: data.timeline ?? null,
        message: data.message ?? null,
        source: data.source ?? null,
        pagesViewed: data.pagesViewed ?? undefined,
        timeOnSite: data.timeOnSite ?? null,
        referrer: data.referrer ?? null,
        utmSource: data.utmSource ?? null,
        utmMedium: data.utmMedium ?? null,
        utmCampaign: data.utmCampaign ?? null,
        utmTerm: data.utmTerm ?? null,
        utmContent: data.utmContent ?? null,
        status: 'NEW',
      },
    });
  }

  async list(query: LeadListQuery) {
    const { page, limit, status, search, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { email: { contains: search } },
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { company: { contains: search } },
        ],
      }),
    };

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        notes: {
          include: { author: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async updateStatus(id: string, status: LeadStatus) {
    return this.prisma.lead.update({
      where: { id },
      data: { status },
    });
  }

  async addNote(leadId: string, content: string, authorId: string) {
    return this.prisma.leadNote.create({
      data: { leadId, content, authorId },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async getStats() {
    const [total, byStatus, recent] = await Promise.all([
      this.prisma.lead.count(),
      this.prisma.lead.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      this.prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const statusCounts: Record<string, number> = {};
    for (const group of byStatus) {
      statusCounts[group.status] = group._count.status;
    }

    return { total, byStatus: statusCounts, recent };
  }
}
