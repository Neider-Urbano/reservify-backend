'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const reservationController_1 = require('../controllers/reservationController');
const notFound_1 = require('../middlewares/notFound');
const router = express_1.default.Router();
router.post('/reservations', reservationController_1.createReservation);
router.get('/reservations', reservationController_1.getReservations);
router.put('/reservations/:id', reservationController_1.updateReservation);
router.delete('/reservations/:id', reservationController_1.deleteReservation);
router.use(notFound_1.notFound);
exports.default = router;
