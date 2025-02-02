import { Request, Response } from 'express';
import { PromoCode,Usage } from '../models/promo.models';

export async function createPromoCode(req: Request, res: Response) {
    try {
        const { code, cashbackAmount, maxUsesPerUser } = req.body;

        const promoCode = await PromoCode.create({
            code,
            cashbackAmount,
            maxUsesPerUser,
        });

        res.status(201).json({ message: 'Promo code created successfully', promoCode });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create promo code', details: (error as Error).message });
    }
}

export async function listPromoCodes(req: Request, res: Response) {
    try {
        const promoCodes = await PromoCode.findAll({
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json(promoCodes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch promo codes', details: (error as Error).message });
    }
}
