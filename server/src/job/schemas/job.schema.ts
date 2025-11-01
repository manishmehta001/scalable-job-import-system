import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document {
  @Prop()
  title: string;

  @Prop()
  link: string;

  @Prop()
  company: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
