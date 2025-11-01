import { Processor, Process } from '@nestjs/bull';
import { JobService } from './../job/job.service';
import { ImportJobService } from './../import_job/import_job.service';
import { Logger } from '@nestjs/common';

@Processor('jobQueue')
export class QueueService {
  constructor(
    private jobsService: JobService,
    private importLogService: ImportJobService,
  ) {}

  @Process('fetch-jobs')
  async handleJob() {
    try {
      const result = await this.jobsService.fetchAndSaveJobs();
      await this.importLogService.createLog(result);
      console.log('Job imported and log stored successfully.');
      return result;
    } catch (error) {
      console.error(' Error during job import:', error.message);
      await this.importLogService.createLog({
        totalFetched: 0,
        newCount: 0,
        updatedCount: 0,
        error,
      });
    }
  }
}
