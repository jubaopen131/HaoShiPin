import { Module } from '@nestjs/common';
import { VideoJobsModule } from './video-jobs/video-jobs.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [VideoJobsModule, BillingModule]
})
export class AppModule {}
