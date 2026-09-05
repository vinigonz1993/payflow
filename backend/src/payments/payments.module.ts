import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}