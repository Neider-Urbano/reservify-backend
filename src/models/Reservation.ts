import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  service: mongoose.Schema.Types.ObjectId;
  date: Date;
  status: string;
  comments?: string;
}

const ReservationSchema: Schema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'La fecha de la reserva es obligatoria'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Reservation = mongoose.model<IReservation>(
  'Reservation',
  ReservationSchema,
);
export default Reservation;
