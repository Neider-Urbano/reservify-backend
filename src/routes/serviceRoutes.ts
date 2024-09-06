import express from 'express';
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { authorizeRole } from '../middlewares/auth';

const router = express.Router();

router.post('/services', authorizeRole(['admin']), createService);
router.get('/services', authorizeRole(['admin', 'user']), getServices);
router.put('/services/:id', authorizeRole(['admin']), updateService);
router.delete('/services/:id', authorizeRole(['admin']), deleteService);

export default router;
