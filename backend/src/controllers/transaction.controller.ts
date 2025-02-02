import { Op, Transaction as DatabaseTransaction } from "sequelize";
import { Transaction } from "../models/transaction.models";
import { Request, Response } from 'express';
import sequelize from "../../database/db.config";
import { getUserFromNumber } from "../services/user.service";
import { User } from "../models/user.models";
import { createTransactData } from '../services/transaction.service';
import { Provider } from "../models/provider.models";

async function payBill(req:Request,res:Response){
    try{
        console.log(req.body);
        const senderId=req.params.id;
        const amount=req.body.amount;

        await sequelize.transaction(async trx => {
            const providerId=req.body.providerId;
      
            if (!providerId || isNaN(Number(providerId))) {
              throw {
                code: 400,
                message: 'Invalid provider id'
              }
            }
      
            const sender = await User.findByPk(senderId);
            if (!sender) {
              throw {
                code: 400,
                message: 'Sender not found'
              }
            }
      
            if (sender.balance < amount) {
              throw {
                code: 400,
                message: 'Insufficient balance'
              }
            }
            const provider=await Provider.findByPk(providerId);
            if(!provider){
                throw {
                    code: 400,
                    message: 'Provider not found'
                  }
            }
      
            sender.balance -= amount;
            provider.providerBalance += amount;
      
            await sender.save({
              transaction: trx
            });
            await provider.save({
              transaction: trx
            });
      
            // add the transaction 
            const trxData = createTransactData(Number(senderId), provider.id, amount, 'bill_payment');
            const transactionsuccess = await addTransaction(trxData, trx);
      
            if (!transactionsuccess) {
              throw {
                code: 500,
                message: 'An error occurred while adding a transaction'
              }
            }
        })
        res.json({ message: "Bill paid successfully" });
    }catch(error){
        res.status(500).json({ error: 'An error occurred while paying the bill' });
        return
    }
}


export async function sendMoney(req: Request, res: Response) {
    try {
      const senderId = req.params.id;
      const receiverNumber = req.body.receiverNumber;
      const amount = req.body.amount;
    
      await sequelize.transaction(async trx => {
        const receiver = await getUserFromNumber(receiverNumber);
  
        if (receiver == null) {
          throw {
            code: 400,
            message: 'Invalid receiver number'
          }
        }
        const sender = await User.findByPk(senderId);
        if (!sender) {
          throw {
            code: 400,
            message: 'Sender not found'
          }
        }
  
        if (sender.balance < amount) {
          throw {
            code: 400,
            message: 'Insufficient balance'
          }
        }
  
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save({
          transaction: trx
        });
        await receiver.save({
          transaction: trx
        });

        // add the transaction 
        const trxData = createTransactData(Number(senderId), receiver.id, amount, 'transfer');
        const transactionsuccess = await addTransaction(trxData, trx);
  
        if (!transactionsuccess) {
          throw {
            code: 500,
            message: 'An error occurred while adding a transaction'
          }
        }
      })
  
      res.json({ message: "Money sent successfully" });
    }
    catch (error) {
      const errorObject = error as {
        code: number
        message: string
      }
      res
        .status(errorObject.code || 500)
        .json({ error: `An error occurred while sending money: ${errorObject.message}` });
    }
  
  }

async function getTransactions(req: Request, res: Response) {
    try {
        const transactions = await Transaction.findAll({ where: { [Op.or]: [{ senderId: req.params.id }, { recipientId: req.params.id }] }, order: [['paymentDate', 'DESC']] });
        res.json(transactions);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'An error occurred while fetching the transactions' });
    }
}
async function getAllTransactions(req: Request, res: Response) {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
        return
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the transactions' });
        return
    }
}
async function addTransaction(trx: Transaction, dbTransaction: DatabaseTransaction) {
    try {
        await trx.save({
            transaction: dbTransaction
        });
        return true;
    } catch (error) {
        return false;
    }
}




export { addTransaction, getTransactions, getAllTransactions,payBill };