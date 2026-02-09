import { asyncHandler } from '../utils/asyncHandler.js';
import { Hostel } from '../models/hostel.model.js';

export const listHostels = asyncHandler(async (req, res) => {
  const hostels = await Hostel.find().lean();
  res.json({ data: hostels });
});
