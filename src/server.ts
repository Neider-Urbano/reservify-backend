import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import reservationRoutes from './routes/reservationRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middlewares/auth';

const app = express();

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message:
    'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
});

app.use(limiter);

app.use(express.json());

app.use(mongoSanitize());

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido a Reservify API');
});

app.use('/api/auth', authRoutes);

app.use('/api', authenticateToken, reservationRoutes);

export default app;
