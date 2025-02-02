import { Router } from "express";
import promoRouter from "../src/routes/promo.routes";
import providerRouter from "../src/routes/provider.routes";
import transactionRouter from "../src/routes/transaction.routes";
import userRouter from "../src/routes/user.routes";

export const router = Router()

router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/providers', providerRouter);
router.use('/promotions', promoRouter);
