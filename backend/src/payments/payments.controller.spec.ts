import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentDto: CreatePaymentDto;

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
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);

    paymentDto = {
      amount: 100,
      currency: 'USD',
      recipientId: 'recipient_123',
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment', () => {
    paymentServiceMock.createPayment.mockReturnValue({
      id: 'payment_123',
      ...paymentDto,
      status: 'pending',
    });
    const result = controller.createPayment(paymentDto);
    expect(result).toBeDefined();
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
