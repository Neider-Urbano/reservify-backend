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

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, authorizeRole(['admin']), getUsers);
router.get(
  '/users/:id',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  getUser,
);
router.put(
  '/users/:id',
  authenticateToken,
  authorizeRole(['admin', 'user']),
  updateUser,
);
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRole(['admin']),
  deleteUser,
);

export default router;
