import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    value,
    type,
  }: CreateTransactionRequest): Transaction {
    const totalBalance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > totalBalance.total) {
      throw Error('Outcome value is over your balance.');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
