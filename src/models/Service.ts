import mongoose, { Document, Schema } from 'mongoose';

interface IService extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<IService>('Service', ServiceSchema);
