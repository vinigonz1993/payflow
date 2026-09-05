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
      findUnique: vi.fn(),
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
    const userId = 'user_123';

    const result = service.createPayment(paymentDto, userId);

    expect(result).toEqual({
      id: 'payment_123',
      ...paymentDto,
      userId,
      status: 'pending',
    });
  });

  it('should retrieve a payment by id', () => {
    const payment = {
      id: 'payment_123',
      amount: 100,
      currency: 'USD',
      recipientId: 'recipient_123',
      status: 'pending',
    }
    prismaMock.payment.findUnique.mockReturnValue(payment);
    const result = service.getPaymentById(payment.id);
    expect(result).toBeDefined();
    expect(prismaMock.payment.findUnique).toHaveBeenCalledWith({
      where: {
        id: payment.id,
      },
    });
  });

  it('should get all payments', () => {
    const payments = [
      {
        id: 'payment_123',
        amount: 100,
        currency: 'USD',
        recipientId: 'recipient_123',
        status: 'pending',
      },
    ];
    prismaMock.payment.findMany.mockReturnValue(payments);
    const result = service.getPayments();
    expect(result).toBeDefined();
    expect(prismaMock.payment.findMany).toHaveBeenCalled();
  });
});
