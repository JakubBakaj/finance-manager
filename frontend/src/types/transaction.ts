export type TransactionType = "income" | "expense";

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
};
