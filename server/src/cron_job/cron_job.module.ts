import { Module } from '@nestjs/common';
import { CronJobService } from './cron_job.service';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [BullModule.registerQueue({ name: 'jobQueue' })],
  providers: [CronJobService],
})
export class CronJobModule {}
