import { Router } from 'express';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const router = Router();

router.get('/users/', async (_request, response) => {
  const users = await User.find().sort({ displayName: 1 });
  response.json(users);
});

router.get('/teams/', async (_request, response) => {
  const teams = await Team.find().sort({ name: 1 });
  response.json(teams);
});

router.get('/activities/', async (_request, response) => {
  const activities = await Activity.find().sort({ activityDate: -1 });
  response.json(activities);
});

router.get('/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  response.json(leaderboard);
});

router.get('/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ title: 1 });
  response.json(workouts);
});

export default router;