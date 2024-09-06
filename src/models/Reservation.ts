import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  date: { type: Date, required: true },
});

export default mongoose.model('Reservation', ReservationSchema);
