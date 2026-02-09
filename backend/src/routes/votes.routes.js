import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import * as votesCtrl from '../controllers/votes.controller.js';

const router = Router({ mergeParams: true });

router.post('/:productId/vote', authRequired, votesCtrl.vote);

export default router;
