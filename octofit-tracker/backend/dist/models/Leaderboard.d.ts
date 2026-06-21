import mongoose, { Document } from 'mongoose';
export interface ILeaderboard extends Document {
    userId: mongoose.Types.ObjectId;
    username: string;
    points: number;
    rank: number;
    teamId?: mongoose.Types.ObjectId;
    period: string;
    updatedAt: Date;
}
export declare const Leaderboard: mongoose.Model<ILeaderboard, {}, {}, {}, mongoose.Document<unknown, {}, ILeaderboard, {}, {}> & ILeaderboard & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Leaderboard.d.ts.map