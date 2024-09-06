import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './routes/index';
import { setupSwagger } from '../swaggerConfig';

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
setupSwagger(app);
app.use(routes);

export default app;
