import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage {
  senderId: Types.ObjectId;
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  participants: Types.ObjectId[];
  messages: IMessage[];
  metadata: {
    summary?: string;
  };
}

const MessageSchema: Schema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema: Schema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [MessageSchema],
  metadata: {
    summary: { type: String },
  },
});

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
