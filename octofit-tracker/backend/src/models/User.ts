import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
