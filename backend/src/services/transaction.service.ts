import { Transaction } from "../models/transaction.models";

export function createTransactData(senderId: number, recipientId: number, amount: number, type: 'transfer' | 'bill_payment'): Transaction {
    const trx = new Transaction();
    trx.senderId = senderId;
    trx.recipientId = recipientId;
    trx.amount = amount;
    trx.type = type;
    trx.paymentDate = new Date();
    return trx;
}