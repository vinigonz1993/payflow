import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const prismaMock = {
    payment: {
      findMany: vi.fn(),
      create: vi.fn(),
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a payment', () => {
    const paymentDto: CreatePaymentDto = {
      amount: 100,
      currency: 'USD',
      recipientId: 'recipient_123',
    };
    expect(paymentDto).toBeDefined();

    const result = service.createPayment(paymentDto);
    expect(result).toBeDefined();
  });
});
