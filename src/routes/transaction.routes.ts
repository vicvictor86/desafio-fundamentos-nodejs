import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.status(200).json({transactions, balance});
  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    
    const createTransactionService = new CreateTransactionService(transactionsRepository);

    const { id, title : titleRes, value : valueRes, type : typeRes} = createTransactionService.execute({ title, value, type });
  
    return response.status(200).json({ id, title : titleRes, value : valueRes, type : typeRes});

  } catch (err) {
    return response.status(400).json({ error: (err as Error).message });
  }
});

export default transactionRouter;
