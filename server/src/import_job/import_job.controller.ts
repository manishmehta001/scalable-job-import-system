import { Controller, Get } from '@nestjs/common';
import { ImportJobService } from './import_job.service';

@Controller('import-jobs')
export class ImportJobController {
  constructor(private readonly importJobService: ImportJobService) {}

  @Get()
  async getAllLogs() {
    return await this.importJobService.getAllLogs();
  }
}
