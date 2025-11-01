import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ImportJob extends Document {
  @Prop()
  totalFetched: number;

  @Prop()
  totalImported: number;

  @Prop()
  newJobs: number;

  @Prop()
  updatedJobs: number;

  @Prop({ default: 0 })
  failedJobs: number;

  @Prop() errorReason?: string;
  @Prop() fileName?: string;
}

export const ImportJobSchema = SchemaFactory.createForClass(ImportJob);
