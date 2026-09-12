import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PaymentEventDocument = HydratedDocument<PaymentEvent>;

@Schema({ timestamps: true })
export class PaymentEvent {
    @Prop({ required: true })
    paymentId: string;

    @Prop({ required: true })
    event: string;

    @Prop({ type: Object })
    metadata: Record<string, unknown>;
}

export const PaymentEventSchema = SchemaFactory.createForClass(PaymentEvent)