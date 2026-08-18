import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        username: 'maya_runner',
        email: 'maya.runner@example.com',
        displayName: 'Maya Chen',
        age: 29,
        fitnessGoal: 'Train for a spring half marathon',
        joinedAt: new Date('2026-01-08'),
      },
      {
        username: 'leo_lifts',
        email: 'leo.lifts@example.com',
        displayName: 'Leo Martinez',
        age: 34,
        fitnessGoal: 'Build strength with consistent weekly training',
        joinedAt: new Date('2026-02-14'),
      },
      {
        username: 'aisha_flow',
        email: 'aisha.flow@example.com',
        displayName: 'Aisha Johnson',
        age: 27,
        fitnessGoal: 'Improve mobility and recovery habits',
        joinedAt: new Date('2026-03-03'),
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        mascot: 'Compass',
        city: 'Portland',
        memberCount: 12,
        weeklyGoalMinutes: 1800,
      },
      {
        name: 'Core Crew',
        mascot: 'Kettlebell',
        city: 'Austin',
        memberCount: 9,
        weeklyGoalMinutes: 1350,
      },
    ]);

    await Activity.insertMany([
      {
        username: 'maya_runner',
        activityType: 'Outdoor Run',
        durationMinutes: 48,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-15T07:30:00Z'),
      },
      {
        username: 'leo_lifts',
        activityType: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 360,
        activityDate: new Date('2026-08-15T18:00:00Z'),
      },
      {
        username: 'aisha_flow',
        activityType: 'Yoga Flow',
        durationMinutes: 40,
        caloriesBurned: 180,
        activityDate: new Date('2026-08-16T06:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        username: 'maya_runner',
        teamName: 'Trail Blazers',
        points: 1280,
        rank: 1,
        activeMinutes: 265,
      },
      {
        username: 'leo_lifts',
        teamName: 'Core Crew',
        points: 1115,
        rank: 2,
        activeMinutes: 220,
      },
      {
        username: 'aisha_flow',
        teamName: 'Trail Blazers',
        points: 980,
        rank: 3,
        activeMinutes: 195,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Builder Run',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        targetGoal: 'Build aerobic endurance',
        exercises: ['10 minute warmup jog', '20 minute tempo run', '10 minute cooldown', '5 minute stretch'],
      },
      {
        title: 'Full Body Strength Circuit',
        category: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 50,
        targetGoal: 'Increase total-body strength',
        exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Romanian deadlifts', 'Plank holds'],
      },
      {
        title: 'Recovery Mobility Reset',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 25,
        targetGoal: 'Improve flexibility and recovery',
        exercises: ['Cat-cow flow', 'Hip openers', 'Hamstring flossing', 'Thoracic rotations', 'Box breathing'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
