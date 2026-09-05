import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentDto: CreatePaymentDto;
  let user: AuthenticatedUser;

  const paymentServiceMock = {
    createPayment: vi.fn(),
    getPaymentById: vi.fn(),
    getPayments: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: paymentServiceMock,
        },
      ],
    }).overrideGuard(
      JwtAuthGuard
    ).useValue({
      canActivate: () => true
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);

    paymentDto = {
      amount: 100,
      currency: 'USD',
      recipientId: 'recipient_123',
    };
    user = {
      id: 'user_123',
      email: 'test@example.com',
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment', () => {
    paymentServiceMock.createPayment.mockReturnValue({
      id: 'payment_123',
      ...paymentDto,
      userId: user.id,
      status: 'pending',
    });
    const result = controller.createPayment(paymentDto, user);

    expect(result).toBeDefined();
    expect(paymentServiceMock.createPayment).toHaveBeenCalledWith(
      paymentDto,
      user.id,
    );
  });

  it('should retrieve a payment by id', () => {
    const payment = {
      id: 'payment_123',
      ...paymentDto,
      status: 'pending',
    };

    paymentServiceMock.getPaymentById.mockReturnValue(payment);

    const result = controller.getPaymentById(payment.id);
    expect(result).toBeDefined();
  });

  it('should get all payments', () => {
    const payments = [
      {
        id: 'payment_123',
        ...paymentDto,
        status: 'pending',
      },
    ];

    paymentServiceMock.getPayments.mockReturnValue(payments);

    const result = controller.getPayments();
    expect(result).toBeDefined();
  });
});
