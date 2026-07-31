import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import { notFound, errorHandler } from './src/middleware/error.middleware.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming body:", req.body);
  next();
});

app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the TaskFlow API');
});

app.use(notFound);
app.use(errorHandler);

export default app;
