import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', authRequired, authCtrl.me);

export default router;
