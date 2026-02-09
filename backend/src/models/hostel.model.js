import mongoose from 'mongoose';
const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String
}, { timestamps: true });

export const Hostel = mongoose.model('Hostel', hostelSchema);
