import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
