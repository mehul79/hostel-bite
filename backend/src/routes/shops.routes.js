import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import * as shopsCtrl from '../controllers/shops.controller.js';

const router = Router();

router.get('/', authRequired, shopsCtrl.listShops);
router.get('/:shopId', authRequired, shopsCtrl.getShop);
router.post('/', authRequired, shopsCtrl.createShop);

export default router;
