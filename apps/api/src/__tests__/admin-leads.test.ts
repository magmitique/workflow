import { describe, it, expect } from 'vitest';
import {
  leadListQuerySchema,
  leadUpdateStatusSchema,
  leadNoteCreateSchema,
  leadReplySchema,
} from '@apio/shared';

describe('Admin leads schemas', () => {
  describe('leadListQuerySchema', () => {
    it('parses with defaults', () => {
      const result = leadListQuerySchema.parse({});
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.sortBy).toBe('createdAt');
      expect(result.sortOrder).toBe('desc');
    });

    it('parses with all filters', () => {
      const result = leadListQuerySchema.parse({
        page: '2',
        limit: '10',
        status: 'NEW',
        search: 'test',
        sortBy: 'email',
        sortOrder: 'asc',
      });
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.status).toBe('NEW');
      expect(result.search).toBe('test');
      expect(result.sortBy).toBe('email');
      expect(result.sortOrder).toBe('asc');
    });

    it('rejects invalid status', () => {
      const result = leadListQuerySchema.safeParse({ status: 'INVALID' });
      expect(result.success).toBe(false);
    });

    it('rejects page < 1', () => {
      const result = leadListQuerySchema.safeParse({ page: '0' });
      expect(result.success).toBe(false);
    });
  });

  describe('leadUpdateStatusSchema', () => {
    it('accepts valid statuses', () => {
      const statuses = ['NEW', 'CONTACTED', 'MEETING', 'PROPOSAL', 'WON', 'LOST'] as const;
      for (const status of statuses) {
        const result = leadUpdateStatusSchema.safeParse({ status });
        expect(result.success).toBe(true);
      }
    });

    it('rejects invalid status', () => {
      const result = leadUpdateStatusSchema.safeParse({ status: 'UNKNOWN' });
      expect(result.success).toBe(false);
    });
  });

  describe('leadNoteCreateSchema', () => {
    it('accepts valid note', () => {
      const result = leadNoteCreateSchema.safeParse({ content: 'A note' });
      expect(result.success).toBe(true);
    });

    it('rejects empty content', () => {
      const result = leadNoteCreateSchema.safeParse({ content: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('leadReplySchema', () => {
    it('accepts valid reply', () => {
      const result = leadReplySchema.safeParse({
        subject: 'Re: Votre demande',
        body: 'Merci pour votre message.',
      });
      expect(result.success).toBe(true);
    });

    it('rejects empty subject', () => {
      const result = leadReplySchema.safeParse({
        subject: '',
        body: 'Contenu',
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty body', () => {
      const result = leadReplySchema.safeParse({
        subject: 'Objet',
        body: '',
      });
      expect(result.success).toBe(false);
    });
  });
});
