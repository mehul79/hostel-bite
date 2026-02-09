import mongoose from 'mongoose';
const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  vote: { type: Number, enum: [1, -1], required: true }
}, { timestamps: true });

voteSchema.index({ user: 1, product: 1 }, { unique: true });

export const Vote = mongoose.model('Vote', voteSchema);
