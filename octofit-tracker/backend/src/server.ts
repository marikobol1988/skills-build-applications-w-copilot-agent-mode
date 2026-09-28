import express from 'express';
import database, { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    database: database.readyState === 1 ? 'connected' : 'disconnected',
    apiBaseUrl,
  });
});

app.get('/api/users/', async (_request, response) => response.json(await User.find().lean()));
app.get('/api/teams/', async (_request, response) => response.json(await Team.find().lean()));
app.get('/api/activities/', async (_request, response) => response.json(await Activity.find().lean()));
app.get('/api/leaderboard/', async (_request, response) => response.json(await Leaderboard.find().sort({ rank: 1 }).lean()));
app.get('/api/workouts/', async (_request, response) => response.json(await Workout.find().lean()));

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${apiBaseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Unable to connect to MongoDB:', error);
    process.exitCode = 1;
  });