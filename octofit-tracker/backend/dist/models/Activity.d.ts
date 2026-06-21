import mongoose, { Document } from 'mongoose';
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
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, {}> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Activity.d.ts.map