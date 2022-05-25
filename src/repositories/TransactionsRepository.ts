import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';
import {v4} from 'uuid';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    this.transactions.forEach(transaction => {
      if(transaction.type === 'income'){
        income += transaction.value;
        total += transaction.value;
      }
      else {
        outcome += transaction.value;
        total -= transaction.value;
      }
    })

    return { income, outcome, total };
  }

  public create({ title, value, type }: Request): Transaction {
    const id = v4();

    const transactionRequest = { id, title, value, type };

    this.transactions.push(transactionRequest);

    return transactionRequest;
  }
}

export default TransactionsRepository;
