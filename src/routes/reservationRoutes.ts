import express from 'express';
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';

const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);

export default router;
