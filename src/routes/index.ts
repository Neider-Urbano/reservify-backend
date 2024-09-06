import express from 'express';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes';
import reservationRoutes from './reservationRoutes';
import { authenticateToken, authorizeRole } from '../middlewares/auth';

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', authenticateToken, serviceRoutes);
router.use(
  '/api',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  reservationRoutes,
);

export default router;
