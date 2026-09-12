import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';
import { PaymentEventsService } from '../payment-events/payment-events.service.js';

@Injectable()
export class PaymentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly paymentEventsService: PaymentEventsService,
    ) {}

    async createPayment(data: CreatePaymentDto, userId: string) {
        const payment = await this.prisma.payment.create({
            data: {
                amount: data.amount,
                currency: data.currency,
                recipientId: data.recipientId,
                userId: userId,
                status: 'pending',
            },
        });

        await this.paymentEventsService.create(
            payment.id,
            'payment.created',
            {
                amount: data.amount,
                currency: data.currency,
                recipientId: data.recipientId,
                userId,
            }
        )

        return payment;
    }
    getPayments() {
        return this.prisma.payment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    getPaymentById(id: string) {
        return this.prisma.payment.findUnique({
            where: {
                id,
            },
        });
    }
}
