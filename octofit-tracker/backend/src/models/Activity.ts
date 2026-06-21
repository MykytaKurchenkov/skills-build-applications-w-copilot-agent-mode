import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  distance: number;
  duration: number;
  calories: number;
  description: string;
  date: Date;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'cycling', 'swimming', 'hiking', 'gym'], required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    points: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
