import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post()
    createPayment(@Body() body: CreatePaymentDto) {
        return this.paymentsService.createPayment(body);
    }

    @Get()
    getPayments() {
        return this.paymentsService.getPayments();
    }
}
