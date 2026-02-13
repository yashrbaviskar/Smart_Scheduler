import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISchedule extends Document {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  subject: string;
  startTime: Date;
  endTime: Date;
  status: 'Pending' | 'Confirmed';
  source: 'Manual' | 'AI-Suggested';
}

const ScheduleSchema: Schema = new Schema<ISchedule>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed'], required: true },
  source: { type: String, enum: ['Manual', 'AI-Suggested'], required: true },
});

export default mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
