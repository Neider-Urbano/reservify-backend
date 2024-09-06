import express, { Request, Response } from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { authorizeRole } from '../middlewares/auth';
import { notFound } from '../middlewares/notFound';

const router = express.Router();

router.post('/services', authorizeRole(['admin']), createService);
router.get('/services', authorizeRole(['admin', 'user']), getServices);
router.put('/services/:id', authorizeRole(['admin']), updateService);
router.delete('/services/:id', authorizeRole(['admin']), deleteService);
router.use(notFound);

export default router;
