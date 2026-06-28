import type { Transaction, TransactionType } from "../types/transaction";

type TransactionResponse = Omit<Transaction, "amount"> & {
  amount: number | string;
};

const isTransactionType = (value: unknown): value is TransactionType =>
  value === "income" || value === "expense";

const parseTransaction = (value: TransactionResponse): Transaction => {
  const amount = Number(value.amount);

  if (
    !Number.isFinite(amount) ||
    typeof value.id !== "number" ||
    typeof value.title !== "string" ||
    typeof value.createdAt !== "string" ||
    !isTransactionType(value.type)
  ) {
    throw new Error("API zwróciło nieprawidłowe dane transakcji.");
  }

  return { ...value, amount };
};

export async function getTransactions(signal?: AbortSignal) {
  const response = await fetch("/api/transactions", { signal });

  if (!response.ok) {
    throw new Error(`Nie udało się pobrać transakcji (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("API zwróciło nieprawidłową odpowiedź.");
  }

  return (data as TransactionResponse[]).map(parseTransaction);
}
