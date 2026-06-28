import "../styles/History.scss";
import { formatCurrency } from "../lib/currency";
import type { Transaction } from "../types/transaction";
import AddTransactionModal from "./AddTransactionModal";
import { useState } from "react";

type HistoryProps = {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  onTransactionAdded: (transaction: Transaction) => void;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

export default function History(
  { transactions, isLoading, error, onTransactionAdded }: HistoryProps,
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="History">
        <h2 className="History-title">History</h2>
        {isLoading && <p className="History-message">Loading transactions…</p>}
        {error && <p className="History-message History-error">{error}</p>}
        {!isLoading && !error && transactions.length === 0 && (
          <p className="History-message">
            You don't have any transactions yet.
          </p>
        )}
        {!isLoading && !error && transactions.length > 0 && (
          <ul className="History-list">
            {transactions.map((transaction) => (
              <li className="History-item" key={transaction.id}>
                <div>
                  <strong>{transaction.title}</strong>
                  <time dateTime={transaction.createdAt}>
                    {formatDate(transaction.createdAt)}
                  </time>
                </div>
                <span className={`History-amount is-${transaction.type}`}>
                  {transaction.type === "income" ? "+" : "−"}
                  {formatCurrency(transaction.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          className="History-add-button"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          Add Transaction
        </button>
      </section>
      {isModalOpen && (
        <AddTransactionModal
          onAdded={onTransactionAdded}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
