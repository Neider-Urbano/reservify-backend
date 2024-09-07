import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  login,
  register,
  updateUser,
} from '../controllers/authController';
import { authenticateToken, authorizeRole } from '../middlewares/auth';
import { notFound } from '../middlewares/notFound';

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en la aplicación.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: El email del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Usuario ya registrado o datos inválidos.
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Inicia sesión con un nombre de usuario y contraseña.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: El email del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales incorrectas.
 */
router.post('/login', login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *       401:
 *         description: No autorizado.
 */
router.get('/users', authenticateToken, authorizeRole(['admin']), getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtiene la información de un usuario específico.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: No autorizado.
 */
router.get(
  '/users/:id',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  getUser,
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     description: Actualiza la información de un usuario específico.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El nuevo email del usuario.
 *               password:
 *                 type: string
 *                 description: La nueva contraseña del usuario.
 *               role:
 *                 type: string
 *                 description: El nuevo rol del usuario.
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: No autorizado.
 */
router.put(
  '/users/:id',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  updateUser,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Elimina un usuario específico.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       401:
 *         description: No autorizado.
 */
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRole(['admin']),
  deleteUser,
);

router.use(notFound);

export default router;
