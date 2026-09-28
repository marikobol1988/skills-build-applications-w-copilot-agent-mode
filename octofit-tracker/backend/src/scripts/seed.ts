import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { username: 'maya-chen', email: 'maya.chen@example.com', name: 'Maya Chen' },
      { username: 'jordan-lee', email: 'jordan.lee@example.com', name: 'Jordan Lee' },
      { username: 'sam-rivera', email: 'sam.rivera@example.com', name: 'Sam Rivera' },
      { username: 'alex-morgan', email: 'alex.morgan@example.com', name: 'Alex Morgan' },
    ]);
    const usersByName = new Map(users.map((user) => [user.username, user]));

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        motto: 'One more mile, together.',
        points: 860,
        members: [usersByName.get('maya-chen')!._id, usersByName.get('jordan-lee')!._id],
      },
      {
        name: 'Wave Makers',
        motto: 'Find your rhythm.',
        points: 740,
        members: [usersByName.get('sam-rivera')!._id, usersByName.get('alex-morgan')!._id],
      },
    ]);
    const teamsByName = new Map(teams.map((team) => [team.name, team]));

    await Promise.all([
      User.updateMany(
        { username: { $in: ['maya-chen', 'jordan-lee'] } },
        { $set: { team: teamsByName.get('Trail Blazers')!._id } },
      ),
      User.updateMany(
        { username: { $in: ['sam-rivera', 'alex-morgan'] } },
        { $set: { team: teamsByName.get('Wave Makers')!._id } },
      ),
    ]);

    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    await Activity.insertMany([
      { user: usersByName.get('maya-chen')!._id, type: 'running', durationMinutes: 38, caloriesBurned: 310, date: new Date(now - day) },
      { user: usersByName.get('jordan-lee')!._id, type: 'cycling', durationMinutes: 52, caloriesBurned: 420, date: new Date(now - 2 * day) },
      { user: usersByName.get('sam-rivera')!._id, type: 'swimming', durationMinutes: 30, caloriesBurned: 260, date: new Date(now - 3 * day) },
      { user: usersByName.get('alex-morgan')!._id, type: 'strength', durationMinutes: 45, caloriesBurned: 330, date: new Date(now - 4 * day) },
    ]);

    await Leaderboard.insertMany([
      { team: teamsByName.get('Trail Blazers')!._id, points: 860, rank: 1, period: 'weekly' },
      { team: teamsByName.get('Wave Makers')!._id, points: 740, rank: 2, period: 'weekly' },
    ]);

    await Workout.insertMany([
      { name: 'Easy Pace Run', description: 'A relaxed run to build aerobic endurance.', category: 'running', durationMinutes: 30, difficulty: 'beginner' },
      { name: 'Tempo Builder', description: 'Steady intervals that improve running speed.', category: 'running', durationMinutes: 40, difficulty: 'intermediate' },
      { name: 'Full Body Strength', description: 'A balanced session using fundamental strength movements.', category: 'strength', durationMinutes: 45, difficulty: 'intermediate' },
      { name: 'Recovery Flow', description: 'Gentle mobility work to support recovery.', category: 'mobility', durationMinutes: 20, difficulty: 'beginner' },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
