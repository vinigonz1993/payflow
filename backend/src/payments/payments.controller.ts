import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './create-payment.dto.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Post()
    createPayment(
        @Body() body: CreatePaymentDto,
        @CurrentUser() user: AuthenticatedUser
    ) {
        return this.paymentsService.createPayment(body, user.id);
    }

    @Get()
    getPayments() {
        return this.paymentsService.getPayments();
    }

    @Get(':id')
    getPaymentById(@Param('id') id: string) {
        return this.paymentsService.getPaymentById(id);
    }
}
