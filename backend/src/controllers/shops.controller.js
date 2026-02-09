import { asyncHandler } from '../utils/asyncHandler.js';
import { Shop } from '../models/shop.model.js';
import { ApiError } from '../utils/ApiError.js';

export const listShops = asyncHandler(async (req, res) => {
    const { hostelId, openNow } = req.query;
    const query = {};
    if (hostelId) query.hostel = hostelId;
    if (openNow === 'true') query.open = true;
    const shops = await Shop.find(query).lean();
    res.json({ data: shops });
});

export const getShop = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.shopId).lean();
    if (!shop) throw new ApiError(404, 'Shop not found');
    res.json({ data: shop });
});

// explicit shop creation (optional)
export const createShop = asyncHandler(async (req, res) => {
    const { name, description, openTime, closeTime } = req.body;
    const ownerId = req.user._id;
    const hostelId = req.user.hostel;
    const shop = await Shop.create({ owner: ownerId, hostel: hostelId, name, description, openTime, closeTime });
    res.status(201).json({ data: shop });
});
