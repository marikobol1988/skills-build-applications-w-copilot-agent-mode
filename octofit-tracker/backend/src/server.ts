import express from 'express';
import database, { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    database: database.readyState === 1 ? 'connected' : 'disconnected',
  });
});

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Unable to connect to MongoDB:', error);
    process.exitCode = 1;
  });