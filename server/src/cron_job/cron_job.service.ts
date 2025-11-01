import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class CronJobService {
  constructor(@InjectQueue('jobQueue') private jobQueue: Queue) {}

  @Cron('0 0 * * * *')
  async handleCron() {
    console.log('Running hourly job import...');
    await this.jobQueue.add('fetch-jobs', {});
  }
}
