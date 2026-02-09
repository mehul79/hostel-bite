import { asyncHandler } from '../utils/asyncHandler.js';
import { Product } from '../models/product.model.js';
import { Shop } from '../models/shop.model.js';
import { ApiError } from '../utils/ApiError.js';
import { Notification } from '../models/notification.model.js';


export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock = 0, tags = [], images = [] } = req.body;
    const ownerId = req.user._id;
    const hostelId = req.user.hostel;

    if (!name || !price) throw new ApiError(400, 'name and price required');

    let shop = await Shop.findOne({ owner: ownerId });
    if (!shop) {
        const defaultName = `${req.user.name}'s Shop`;
        shop = await Shop.create({ owner: ownerId, hostel: hostelId, name: defaultName, open: true });
        // optional: notify owner that shop was auto-created
        await Notification.create({
            user: ownerId,
            title: 'Shop created',
            body: `A shop "${defaultName}" was created for you automatically. Edit details from your dashboard.`,
            payload: { shopId: shop._id }
        });
    }

    const product = await Product.create({
        shop: shop._id,
        owner: ownerId,
        hostel: hostelId,
        name,
        description,
        price,
        stock,
        tags,
        images
    });

    res.status(201).json({ data: { product, shop } });
});

export const listProducts = asyncHandler(async (req, res) => {
    const { hostelId, shopId, search, tags } = req.query;
    const q = { isActive: true };
    if (hostelId) q.hostel = hostelId;
    if (shopId) q.shop = shopId;
    if (search) q.name = { $regex: search, $options: 'i' };
    if (tags) q.tags = { $in: tags.split(',') };

    const products = await Product.find(q).lean();
    res.json({ data: products });
});

export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId).lean();
    if (!product) throw new ApiError(404, 'Product not found');
    res.json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);
    if (!product) throw new ApiError(404, 'Product not found');
    if (product.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        throw new ApiError(403, 'Not allowed');
    }
    Object.assign(product, req.body);
    await product.save();
    res.json({ data: product });
});
