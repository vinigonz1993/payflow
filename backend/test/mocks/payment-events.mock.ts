import { vi } from 'vitest';

export const mockPaymentEventsService = {
  create: vi.fn(),
  findByPaymentId: vi.fn(),
};