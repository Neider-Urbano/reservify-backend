import express from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { authorizeRole } from '../middlewares/auth';
import { notFound } from '../middlewares/notFound';

const router = express.Router();

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Crear un nuevo servicio
 *     description: Crea un nuevo servicio con el nombre, descripción y precio especificados.
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del servicio.
 *               description:
 *                 type: string
 *                 description: Descripción del servicio.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del servicio.
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente.
 *       400:
 *         description: Error al crear el servicio.
 */
router.post('/services', authorizeRole(['admin']), createService);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Obtener todos los servicios
 *     description: Obtiene una lista de todos los servicios disponibles.
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de servicios.
 *       400:
 *         description: Error al obtener los servicios.
 */
router.get('/services', authorizeRole(['admin', 'user']), getServices);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Actualizar un servicio por ID
 *     description: Actualiza la información de un servicio específico.
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del servicio.
 *               description:
 *                 type: string
 *                 description: Descripción del servicio.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Precio del servicio.
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente.
 *       400:
 *         description: Error al actualizar el servicio.
 *       404:
 *         description: Servicio no encontrado.
 */
router.put('/services/:id', authorizeRole(['admin']), updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Eliminar un servicio por ID
 *     description: Elimina un servicio específico.
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente.
 *       404:
 *         description: Servicio no encontrado.
 *       400:
 *         description: Error al eliminar el servicio.
 */
router.delete('/services/:id', authorizeRole(['admin']), deleteService);

router.use(notFound);

export default router;
