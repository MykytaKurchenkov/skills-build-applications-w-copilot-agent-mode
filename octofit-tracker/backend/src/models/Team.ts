import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  stats: {
    totalMembers: number;
    totalPoints: number;
    totalActivities: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    members: [mongoose.Schema.Types.ObjectId],
    stats: {
      totalMembers: { type: Number, default: 0 },
      totalPoints: { type: Number, default: 0 },
      totalActivities: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);
