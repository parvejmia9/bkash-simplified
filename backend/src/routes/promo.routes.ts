import express from 'express';
import { createPromoCode,listPromoCodes } from '../controllers/promo.controllers';

const router = express.Router();
router.get('/promos', listPromoCodes);
router.post('/promos/create', createPromoCode);

export default router;