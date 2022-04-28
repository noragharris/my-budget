export type AirtableRecord<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

export type Transaction = {
  id: string;
  accountNumber: string;
  transactionDate: string;
  postedDate?: string;
  transactionAmount: number;
  transactionType: string;
  transactionDescription: string;
  creditCategory?: string;
  split?: boolean;
  splitAmount: number;
  category?: string;
  notes?: string;
};

export type Transactions = AirtableRecord<Transaction>[];
