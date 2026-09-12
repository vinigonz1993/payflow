import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { PaymentEvent, PaymentEventDocument } from "./schema/payment-events.schema.js";

@Injectable()
export class PaymentEventsService {
    constructor(
        @InjectModel(PaymentEvent.name)
        private readonly paymentEventModel: Model<PaymentEventDocument>
    ) {}

    async create (
        paymentId: string,
        event: string,
        metadata?: Record<string, unknown>
    ) {
        return this.paymentEventModel.create({
            paymentId,
            event,
            metadata
        });
    }

    async findByPaymentId(paymentId: string) {
        return this.paymentEventModel
            .find({ paymentId })
            .sort({ createdAt: 1 })
            .exec();
    }
}