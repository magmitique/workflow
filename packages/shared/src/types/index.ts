import type { z } from 'zod';
import type {
  loginSchema,
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userRoleSchema,
  tokenResponseSchema,
  refreshTokenSchema,
  contactFormSchema,
  leadSchema,
  leadNoteSchema,
  leadNoteCreateSchema,
  leadUpdateStatusSchema,
  leadListQuerySchema,
  leadStatusSchema,
  leadReplySchema,
  articleCreateSchema,
  articleUpdateSchema,
  articleSchema,
  articleListQuerySchema,
  tagSchema,
  contentStatusSchema,
  caseStudyCreateSchema,
  caseStudyUpdateSchema,
  caseStudySchema,
  caseStudyListQuerySchema,
  caseStudyResultSchema,
  caseStudyResultOutputSchema,
  paginationSchema,
  healthResponseSchema,
  apiErrorSchema,
} from '../schemas/index.js';

// Auth
export type LoginInput = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type TokenResponse = z.infer<typeof tokenResponseSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

// Lead
export type LeadStatus = z.infer<typeof leadStatusSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type Lead = z.infer<typeof leadSchema>;
export type LeadNote = z.infer<typeof leadNoteSchema>;
export type LeadNoteCreateInput = z.infer<typeof leadNoteCreateSchema>;
export type LeadUpdateStatusInput = z.infer<typeof leadUpdateStatusSchema>;
export type LeadListQuery = z.infer<typeof leadListQuerySchema>;
export type LeadReplyInput = z.infer<typeof leadReplySchema>;

// Article
export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type ArticleCreateInput = z.infer<typeof articleCreateSchema>;
export type ArticleUpdateInput = z.infer<typeof articleUpdateSchema>;
export type Article = z.infer<typeof articleSchema>;
export type ArticleListQuery = z.infer<typeof articleListQuerySchema>;
export type Tag = z.infer<typeof tagSchema>;

// Case Study
export type CaseStudyResultInput = z.infer<typeof caseStudyResultSchema>;
export type CaseStudyResult = z.infer<typeof caseStudyResultOutputSchema>;
export type CaseStudyCreateInput = z.infer<typeof caseStudyCreateSchema>;
export type CaseStudyUpdateInput = z.infer<typeof caseStudyUpdateSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudyListQuery = z.infer<typeof caseStudyListQuerySchema>;

// Common
export type Pagination = z.infer<typeof paginationSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
