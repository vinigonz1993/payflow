import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
    createPayment(data: any) {
        return {
            id: 'payment_123',
            amount: data.amount,
            currency: data.currency,
            recipientId: data.recipientId,
            status: 'pending',
        }
    }
}
