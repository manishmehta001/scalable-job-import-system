import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schemas/job.schema';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async fetchAndSaveJobs() {
    const apiUrl = process.env.JOB_API || 'https://jobicy.com/?feed=job_feed';
    console.log('🔗 Fetching from:', apiUrl);

    try {
      //  Fetch XML data
      const res = await axios.get<string>(apiUrl, { responseType: 'text' });
      const data = await parseStringPromise(res.data);

      // Validate XML structure
      const channel = data?.rss?.channel?.[0];
      if (!channel || !channel.item) {
        throw new Error('Invalid RSS structure');
      }

      //  Transform XML to JSON
      const jobs = channel.item.map((j) => ({
        title: j.title?.[0] || 'No Title',
        link: j.link?.[0] || '',
        company: j['job:company']?.[0] || 'Unknown',
      }));

      console.log(`✅ Parsed ${jobs.length} jobs successfully.`);

      //  Insert / Update Jobs in MongoDB
      let newCount = 0,
        updatedCount = 0;

      for (const job of jobs) {
        const existing = await this.jobModel.findOne({ link: job.link });
        if (existing) {
          await this.jobModel.updateOne({ link: job.link }, job);
          updatedCount++;
        } else {
          await this.jobModel.create(job);
          newCount++;
        }
      }

      //   Return result for logs
      return {
        totalFetched: jobs.length,
        newCount,
        updatedCount,
        error: null,
      };
    } catch (error) {
      console.error(' Job import failed:', error.message);

      return {
        totalFetched: 0,
        newCount: 0,
        updatedCount: 0,
        error,
      };
    }
  }
}
