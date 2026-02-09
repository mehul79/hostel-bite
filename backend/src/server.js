import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { PORT } from './config/env.js';

const start = async () => {
  await connectDB();
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server chal gaya http://localhost:${PORT}`);
  });
};

start().catch(err => {
  console.error('Startup error', err);
  process.exit(1);
});
