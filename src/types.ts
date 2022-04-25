export type Transaction = {
  id: number | string;
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
