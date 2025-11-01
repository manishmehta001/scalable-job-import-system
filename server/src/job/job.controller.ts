import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobsService: JobService) {}

  @Get('fetch')
  async fetchJobs() {
    try {
      const result = await this.jobsService.fetchAndSaveJobs();
      return {
        message: 'Job data fetched and saved successfully!',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to fetch jobs', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
