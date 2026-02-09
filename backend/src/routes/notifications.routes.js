import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import * as notesCtrl from '../controllers/notifications.controller.js';

const router = Router();

router.get('/mine', authRequired, notesCtrl.listMine);
router.patch('/:id/read', authRequired, notesCtrl.markRead);

export default router;
