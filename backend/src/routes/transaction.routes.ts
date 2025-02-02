import express from "express"
import { getTransactions,getAllTransactions  } from "../controllers/transaction.controller"

const router=express.Router();
router.get('/transactions',getAllTransactions);
router.get('/transactions/:id',getTransactions); 


export default router;