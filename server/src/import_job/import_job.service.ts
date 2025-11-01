import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImportJob } from './schema/import-job.schema';

@Injectable()
export class ImportJobService {
  constructor(
    @InjectModel(ImportJob.name) private logModel: Model<ImportJob>,
  ) {}

  async createLog({ totalFetched, newCount, updatedCount, error }) {
    const logData = {
      totalFetched,
      totalImported: newCount + updatedCount,
      newJobs: newCount,
      updatedJobs: updatedCount,
      failedJobs: error ? 1 : 0,
      errorReason: error ? error.message : null,
      fileName: process.env.JOB_API || 'Unknown Source',
    };

    console.log('Creating import log:', logData);
    await this.logModel.create(logData);
  }

  async getAllLogs() {
    return this.logModel.find({}, { __v: 0 }).sort({ createdAt: -1 }).lean();
  }
}
