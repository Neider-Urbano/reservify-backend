"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationController_1 = require("../controllers/reservationController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/reservations', auth_1.authenticateToken, reservationController_1.createReservation);
router.get('/reservations', auth_1.authenticateToken, reservationController_1.getReservations);
router.put('/reservations/:id', auth_1.authenticateToken, reservationController_1.updateReservation);
router.delete('/reservations/:id', auth_1.authenticateToken, reservationController_1.deleteReservation);
exports.default = router;
