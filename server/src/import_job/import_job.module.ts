import { Module } from '@nestjs/common';
import { ImportJobService } from './import_job.service';
import { ImportJobController } from './import_job.controller';
import { ImportJob, ImportJobSchema } from './schema/import-job.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImportJob.name, schema: ImportJobSchema },
    ]),
  ],
  controllers: [ImportJobController],
  providers: [ImportJobService],
  exports: [ImportJobService],
})
export class ImportJobModule {}
