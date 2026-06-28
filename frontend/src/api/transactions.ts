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
    throw new Error("API` returned invalid transaction data.");
  }

  return { ...value, amount };
};

export async function getTransactions(signal?: AbortSignal) {
  const response = await fetch("/api/transactions", { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions (${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("API returned invalid data (expected an array).");
  }

  return (data as TransactionResponse[]).map(parseTransaction);
}

export async function addTransaction(
  transaction: Omit<Transaction, "id" | "createdAt">,
  signal?: AbortSignal,
) {
  const response = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to add transaction (${response.status}).`);
  }

  const data: unknown = await response.json();

  return parseTransaction(data as TransactionResponse);
}
