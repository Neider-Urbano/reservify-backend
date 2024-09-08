import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId, date, comments } = req.body;

    const existingReservation = await Reservation.findOne({
      customer: userId,
      service: serviceId,
    });

    if (existingReservation) {
      return res.status(400).json({
        message: 'Ya existe una reserva para este servicio en esta fecha.',
      });
    }

    const reservation = new Reservation({
      customer: userId,
      service: serviceId,
      date: new Date(date),
      comments,
    });

    await reservation.save();

    res.status(201).json({ message: 'Reserva creada', reservation });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la reserva', error });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { userId, serviceId, date, comments, status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        customer: userId,
        service: serviceId,
        date: new Date(date),
        comments,
        status,
      },
      { new: true },
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva actualizada', reservation });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la reserva', error });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la reserva', error });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const { date, serviceId, userId, status } = req.query;

    const filters: {
      date?: Date;
      service?: string;
      customer?: string;
      status?: string;
    } = {};

    if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      filters.date = new Date(date);
    }

    if (typeof serviceId === 'string') {
      filters.service = serviceId;
    }

    if (typeof userId === 'string') {
      filters.customer = userId;
    }

    if (typeof status === 'string') {
      filters.status = status;
    }

    const reservations =
      await Reservation.find(filters).populate('user service');
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ message: 'Error al recuperar las reservas', error });
  }
};
