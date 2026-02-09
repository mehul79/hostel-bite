import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT = 4000,
  MONGO_URI = 'mongodb://localhost:27017/hostelbite',
  JWT_SECRET = 'please-change-this',
  JWT_EXPIRES_IN = '7d',
  NODE_ENV = 'development'
} = process.env;
