import express from 'express';
import {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';
import { notFound } from '../middlewares/notFound';

const router = express.Router();

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una nueva reserva para un usuario y servicio específicos.
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - serviceId
 *               - date
 *             properties:
 *               userId:
 *                 type: string
 *                 description: El ID del usuario que hace la reserva.
 *               serviceId:
 *                 type: string
 *                 description: El ID del servicio reservado.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La fecha y hora de la reserva.
 *               comments:
 *                 type: string
 *                 description: Comentarios adicionales sobre la reserva.
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente.
 *       400:
 *         description: Error al crear la reserva.
 */
router.post('/reservations', createReservation);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Obtener todas las reservas
 *     description: Obtiene una lista de todas las reservas.
 *     tags: [Reservas]
 *     parameters:
 *       - name: date
 *         in: query
 *         description: Fecha de la reserva en formato ISO 8601.
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: serviceId
 *         in: query
 *         description: ID del servicio para filtrar reservas.
 *         schema:
 *           type: string
 *       - name: userId
 *         in: query
 *         description: ID del usuario para filtrar reservas.
 *         schema:
 *           type: string
 *       - name: status
 *         in: query
 *         description: Estado de la reserva para filtrar reservas.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reservas.
 *       400:
 *         description: Error al obtener las reservas.
 */
router.get('/reservations', getReservations);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     description: Actualiza la información de una reserva específica.
 *     tags: [Reservas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la reserva.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: El ID del usuario que hace la reserva.
 *               serviceId:
 *                 type: string
 *                 description: El ID del servicio reservado.
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La nueva fecha y hora de la reserva.
 *               comments:
 *                 type: string
 *                 description: Comentarios adicionales sobre la reserva.
 *               status:
 *                 type: string
 *                 description: El nuevo estado de la reserva.
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente.
 *       400:
 *         description: Error al actualizar la reserva.
 *       404:
 *         description: Reserva no encontrada.
 */
router.put('/reservations/:id', updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     description: Elimina una reserva específica.
 *     tags: [Reservas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la reserva.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente.
 *       404:
 *         description: Reserva no encontrada.
 *       400:
 *         description: Error al eliminar la reserva.
 */
router.delete('/reservations/:id', deleteReservation);

router.use(notFound);

export default router;
