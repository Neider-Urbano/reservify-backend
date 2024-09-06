import express from 'express';
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

router.post('/reservations', authenticateToken, createReservation);
router.get('/reservations', authenticateToken, getReservations);
router.put('/reservations/:id', authenticateToken, updateReservation);
router.delete('/reservations/:id', authenticateToken, deleteReservation);

export default router;
