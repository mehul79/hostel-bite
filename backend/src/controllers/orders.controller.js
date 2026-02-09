import { asyncHandler } from '../utils/asyncHandler.js';
import { Product } from '../models/product.model.js';
import { Order } from '../models/order.model.js';
import { Notification } from '../models/notification.model.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';

export const placeOrder = asyncHandler(async (req, res) => {
    const { items, deliveryMode, room, paymentMethod } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, 'Items required');
    }
    if (!['delivery', 'pickup'].includes(deliveryMode)) throw new ApiError(400, 'Invalid deliveryMode');

    // load products, check shops consistent
    const productIds = items.map((it) => it.productId);
    const products = await Product.find({ _id: { $in: productIds } }).lean();
    if (products.length !== items.length) throw new ApiError(400, 'Some products not found');

    // Ensure all products belong to same shop (MVP assumption). If not, reject.
    const shopIds = [...new Set(products.map((p) => p.shop.toString()))];
    if (shopIds.length !== 1) throw new ApiError(400, 'All items must be from the same shop');

    const shopId = shopIds[0];

    // compute unit prices and check stock. We'll attempt to decrement stock atomically per product.
    const toDecrement = []; // { productId, qty }
    const orderItems = [];
    let total = 0;

    for (const it of items) {
        const p = products.find((x) => x._id.toString() === it.productId);
        if (!p) throw new ApiError(400, 'Product not found');
        if (p.stock < it.quantity) throw new ApiError(400, `Insufficient stock for ${p.name}`);
        orderItems.push({
            product: p._id,
            name: p.name,
            quantity: it.quantity,
            unitPrice: p.price
        });
        total += p.price * it.quantity;
        toDecrement.push({ productId: p._id, qty: it.quantity });
    }

    // attempt to decrement sequentially, track which succeeded
    const decremented = [];
    try {
        for (const d of toDecrement) {
            const updated = await Product.findOneAndUpdate(
                { _id: d.productId, stock: { $gte: d.qty } },
                { $inc: { stock: -d.qty } },
                { new: true }
            );
            if (!updated) {
                throw new ApiError(400, 'Stock insufficient during processing');
            }
            decremented.push({ productId: d.productId, qty: d.qty });
        }

        // create order doc
        const order = await Order.create({
            user: req.user._id,
            shop: shopId,
            items: orderItems,
            total,
            paymentMethod,
            deliveryMode,
            room,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending' // MVP: payments handled outside
        });

        // create notifications
        // notify shop owner
        await Notification.create({
            user: req.user._id,
            title: 'Order placed',
            body: `Your order ${order._id} was placed.`,
            payload: { orderId: order._id }
        });

        // respond
        res.status(201).json({ data: { orderId: order._id, status: order.status, total } });
    } catch (err) {
        // rollback previously decremented stocks
        for (const d of decremented) {
            await Product.findByIdAndUpdate(d.productId, { $inc: { stock: d.qty } });
        }
        throw err; // handled by error middleware
    }
});

export const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderId).lean();
    if (!order) throw new ApiError(404, 'Order not found');
    // permission: buyer, shop owner, admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        // check shop owner
        const shop = await (await import('../models/shop.model.js')).Shop.findById(order.shop).lean();
        if (!shop) throw new ApiError(403, 'Not allowed');
        if (shop.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            throw new ApiError(403, 'Not allowed');
        }
    }
    res.json({ data: order });
});

export const listMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
    res.json({ data: orders });
});

// owner listing orders for own shop
export const listShopOrders = asyncHandler(async (req, res) => {
    // find owner's shop(s)
    const ShopModel = (await import('../models/shop.model.js')).Shop;
    const shops = await ShopModel.find({ owner: req.user._id }).lean();
    const shopIds = shops.map(s => s._id);
    const orders = await Order.find({ shop: { $in: shopIds } }).sort({ createdAt: -1 }).lean();
    res.json({ data: orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) throw new ApiError(404, 'Order not found');

    // only shop owner or admin can update status
    const ShopModel = (await import('../models/shop.model.js')).Shop;
    const shop = await ShopModel.findById(order.shop);
    if (!shop) throw new ApiError(404, 'Shop not found');
    if (shop.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        throw new ApiError(403, 'Not allowed');
    }

    // basic validation of allowed statuses (MVP simple)
    const allowed = ['accepted', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) throw new ApiError(400, 'Invalid status');

    order.status = status;
    await order.save();

    // notify buyer
    await Notification.create({
        user: order.user,
        title: `Order ${status}`,
        body: `Your order ${order._id} is now ${status}`,
        payload: { orderId: order._id, status }
    });

    res.json({ data: order });
});
