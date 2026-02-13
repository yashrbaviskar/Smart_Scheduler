import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  role: 'Student' | 'Teacher';
  name: string;
  email: string;
  bio?: string;
  preferences: {
    subjects: string[];
    availability: {
      [day: string]: { start: string; end: string }[];
    };
  };
}

const UserSchema: Schema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Student', 'Teacher'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String },
  preferences: {
    subjects: [{ type: String }],
    availability: { type: Schema.Types.Mixed },
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
