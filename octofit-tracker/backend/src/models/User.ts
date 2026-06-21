import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  stats: {
    totalActivities: number;
    totalDistance: number;
    totalDuration: number;
    points: number;
  };
  teamId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String
    },
    stats: {
      totalActivities: { type: Number, default: 0 },
      totalDistance: { type: Number, default: 0 },
      totalDuration: { type: Number, default: 0 },
      points: { type: Number, default: 0 }
    },
    teamId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
