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

  private income: number;
  private outcome: number;
  private total: number;

  constructor() {
    this.transactions = [];
    this.income = 0;
    this.outcome = 0;
    this.total = 0;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return { income: this.income, outcome: this.outcome, total: this.total};
  }

  public create({ title, value, type }: Request): Transaction {
    if(type === 'income'){
      this.income += value;
      this.total += value;
    } else{
      this.outcome += value;
      this.total -= value;
    }
    
    const id = v4();

    const transactionRequest = { id, title, value, type };

    this.transactions.push(transactionRequest);

    return transactionRequest;
  }
}

export default TransactionsRepository;
