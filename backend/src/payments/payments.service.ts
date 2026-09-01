import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class PaymentsService {
    constructor(private readonly prisma: PrismaService) {}


    createPayment(data: any) {
        return {
            id: 'payment_123',
            amount: data.amount,
            currency: data.currency,
            recipientId: data.recipientId,
            status: 'pending',
        }
    }
    getPayments() {
        return this.prisma.payment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
