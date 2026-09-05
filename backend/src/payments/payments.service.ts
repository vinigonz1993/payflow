import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';

@Injectable()
export class PaymentsService {
    constructor(private readonly prisma: PrismaService) {}

    createPayment(data: CreatePaymentDto, userId: string) {
        return {
            id: 'payment_123',
            amount: data.amount,
            currency: data.currency,
            recipientId: data.recipientId,
            userId: userId,
            status: 'pending',
        };
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
