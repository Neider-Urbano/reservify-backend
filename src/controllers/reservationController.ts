import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { customerId, serviceId, date } = req.body;
    const reservation = new Reservation({
      customer: customerId,
      service: serviceId,
      date: new Date(date),
    });
    await reservation.save();
    res.status(201).json({ message: 'Reserva creada', reservation });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la reserva', error });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { customerId, serviceId, date } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        customer: customerId,
        service: serviceId,
        date: new Date(date),
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
    const { date, serviceId, customerId } = req.query;

    const filters: {
      date?: Date;
      service?: string;
      customer?: string;
    } = {};

    if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      filters.date = new Date(date);
    }

    if (typeof serviceId === 'string') {
      filters.service = serviceId;
    }

    if (typeof customerId === 'string') {
      filters.customer = customerId;
    }

    const reservations =
      await Reservation.find(filters).populate('customer service');
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ message: 'Error al recuperar las reservas', error });
  }
};
