import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: mongoose.Types.ObjectId;
  username: string;
  points: number;
  rank: number;
  teamId?: mongoose.Types.ObjectId;
  period: string;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, required: true },
    teamId: mongoose.Schema.Types.ObjectId,
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'all-time' }
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
