import { Notification } from '../models/notification.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listMine = asyncHandler(async (req, res) => {
  const notes = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
  res.json({ data: notes });
});

export const markRead = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Notification.findOneAndUpdate({ _id: id, user: req.user._id }, { read: true });
  res.json({ data: { ok: true } });
});
