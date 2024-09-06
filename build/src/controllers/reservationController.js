'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getReservations =
  exports.deleteReservation =
  exports.updateReservation =
  exports.createReservation =
    void 0;
const Reservation_1 = __importDefault(require('../models/Reservation'));
const createReservation = async (req, res) => {
  try {
    const { customerId, serviceId, date } = req.body;
    const reservation = new Reservation_1.default({
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
exports.createReservation = createReservation;
const updateReservation = async (req, res) => {
  try {
    const { customerId, serviceId, date } = req.body;
    const reservation = await Reservation_1.default.findByIdAndUpdate(
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
exports.updateReservation = updateReservation;
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation_1.default.findByIdAndDelete(
      req.params.id,
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar la reserva', error });
  }
};
exports.deleteReservation = deleteReservation;
const getReservations = async (req, res) => {
  try {
    const { date, serviceId, customerId } = req.query;
    const filters = {};
    if (typeof date === 'string' && !isNaN(Date.parse(date))) {
      filters.date = new Date(date);
    }
    if (typeof serviceId === 'string') {
      filters.service = serviceId;
    }
    if (typeof customerId === 'string') {
      filters.customer = customerId;
    }
    const reservations = await Reservation_1.default
      .find(filters)
      .populate('customer service');
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ message: 'Error al recuperar las reservas', error });
  }
};
exports.getReservations = getReservations;
