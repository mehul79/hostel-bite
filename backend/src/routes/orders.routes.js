import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import * as ordersCtrl from '../controllers/orders.controller.js';

const router = Router();

router.post('/', authRequired, ordersCtrl.placeOrder);
router.get('/mine', authRequired, ordersCtrl.listMyOrders);
router.get('/:orderId', authRequired, ordersCtrl.getOrder);
router.get('/shop/list', authRequired, ordersCtrl.listShopOrders); // owner only
router.patch('/:orderId/status', authRequired, ordersCtrl.updateOrderStatus);

export default router;
