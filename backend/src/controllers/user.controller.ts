import { Request, Response } from 'express';
import { User } from '../models/user.models';
import { addTransaction } from '../controllers/transaction.controller';
import { getBalance} from '../services/user.service';


async function viewUserBalance(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const balance = await getBalance(userId)
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: `An error occurred while fetching the balance: ${(error as Error).message}` });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user=await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the users' });
  }
}


// bonus problems
async function getUsersWithTransactionCount() {
  try {
    const users = await User.findAll({ include: 'transactions' });
    return users;
  } catch (error) {
    return null;
  }
}
async function getTopNUsers(req: Request, res: Response) {
  const n = parseInt(req.params.n);
  if (isNaN(n)) {
    res.status(400).json({ error: 'Invalid number' });
    return
  }
  try {
    const users = await User.findAll({ order: [['balance', 'DESC']], limit: n });
    return users;
  } catch (error) {
    return null;
  }

}
export { getAllUsers };
export { viewUserBalance };