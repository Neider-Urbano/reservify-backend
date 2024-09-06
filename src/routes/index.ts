import express, { NextFunction, Request, Response } from 'express';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes';
import reservationRoutes from './reservationRoutes';
import { authenticateToken, authorizeRole } from '../middlewares/auth';
import { notFound } from '../middlewares/notFound';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido a Reservify API');
});

router.use('/api', authRoutes);
router.use('/api', authenticateToken, serviceRoutes);
router.use(
  '/api',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  reservationRoutes,
);

router.use(notFound);

router.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: 'Ocurrió un error en el servidor', error: err.message });
});

export default router;
