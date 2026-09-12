import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentEvent, PaymentEventSchema } from './schema/payment-events.schema.js';
import { PaymentEventsService } from './payment-events.service.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: PaymentEvent.name,
                schema: PaymentEventSchema
            },
        ]),
    ],
    providers: [PaymentEventsService],
    exports: [PaymentEventsService],
})

export class PaymentEventModule {}