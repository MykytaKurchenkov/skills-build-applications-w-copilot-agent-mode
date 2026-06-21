import mongoose, { Document } from 'mongoose';
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
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, {}> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Workout.d.ts.map