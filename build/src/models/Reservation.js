'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const ReservationSchema = new mongoose_1.default.Schema({
  customer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Customer' },
  service: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Service' },
  date: { type: Date, required: true },
});
exports.default = mongoose_1.default.model('Reservation', ReservationSchema);
