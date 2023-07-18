import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import { FRONTEND_URL } from './config/index';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import router from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Agregar middleware de morgan
app.use(morgan('dev'));

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (_req, res) => {
    console.log(path.resolve('client', 'dist', 'index.html'));
    res.sendFile(path.resolve('client', 'dist', 'index.html'));
  });
}
app.use(notFoundHandler);
app.use(errorMiddleware);

export default app;
