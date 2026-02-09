import { Router } from 'express';
import * as hostelsCtrl from '../controllers/hostels.controller.js';

const router = Router();

router.get('/', hostelsCtrl.listHostels);

export default router;

