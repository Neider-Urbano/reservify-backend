import express, { Request, Response } from 'express';
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';
import { notFound } from '../middlewares/notFound';

const router = express.Router();

router.post('/reservations', createReservation);
router.get('/reservations', getReservations);
router.put('/reservations/:id', updateReservation);
router.delete('/reservations/:id', deleteReservation);
router.use(notFound);

export default router;
