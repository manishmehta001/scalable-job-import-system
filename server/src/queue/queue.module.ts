import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './queue.service';
import { JobModule } from './../job/job.module';
import { ImportJobModule } from './../import_job/import_job.module';

@Module({
  imports: [
    // 👇 Redis connection setup (Bull global config)
    BullModule.forRoot({
      redis: {
        host: 'redis-11189.crce217.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 11189,
        username: 'default',
        password: '8TR8t1nLmJMUGxib8QybPg4PCrIUqjo9',
      },
    }),

    BullModule.registerQueue({ name: 'jobQueue' }),
    JobModule,
    ImportJobModule,
  ],

  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
