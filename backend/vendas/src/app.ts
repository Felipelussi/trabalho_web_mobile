import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from '@routes/index';
import { errorHandler } from '@middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3030',
    credentials: true,
  })
)
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.use('/api', routes);
app.use(errorHandler);

export default app;
