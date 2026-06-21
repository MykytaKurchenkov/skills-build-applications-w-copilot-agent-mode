import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  type: string;
  difficulty: string;
  duration: number;
  estimatedCalories: number;
  instructions: string[];
  equipment: string[];
  suggestedFor?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'sports'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true },
    estimatedCalories: { type: Number, required: true },
    instructions: [String],
    equipment: [String],
    suggestedFor: [mongoose.Schema.Types.ObjectId]
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
