import express from 'express';
import { viewUserBalance,getUser} from '../controllers/user.controller';
import { getAllUsers } from '../controllers/user.controller';
import { sendMoney } from '../controllers/transaction.controller';
import { payBill } from '../controllers/transaction.controller';

const router = express.Router();
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.get('/users/:id/balance', viewUserBalance);

router.post('/users/:id/sendmoney',sendMoney);
router.post('/users/:id/paybill',payBill);

export default router;