import { Router } from 'express';
import authRoutes from './auth.routes.js';
import hostelsRoutes from './hostels.routes.js';
import shopsRoutes from './shops.routes.js';
import productsRoutes from './products.routes.js';
import ordersRoutes from './orders.routes.js';
import votesRoutes from './votes.routes.js';
import notificationsRoutes from './notifications.routes.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: `the server is working!`,
    })
})
router.use('/auth', authRoutes);
router.use('/hostels', hostelsRoutes);
router.use('/shops', shopsRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/products', votesRoutes); // votes under /api/products/:id/vote
router.use('/notifications', notificationsRoutes);

export default router;
