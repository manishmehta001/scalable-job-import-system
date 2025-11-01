import { Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { QueueModule } from './queue/queue.module';
import { ImportJobModule } from './import_job/import_job.module';
import { CronJobModule } from './cron_job/cron_job.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './cron_job/cron_job.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'jobQueue',
    }),
    ScheduleModule.forRoot(),
    QueueModule,
    JobModule,
    ImportJobModule,
    CronJobModule,
  ],
  providers: [CronJobService],
})
export class AppModule {}
