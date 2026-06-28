import { type FormEvent, useEffect, useState } from "react";
import { addTransaction } from "../api/transactions";
import type { Transaction, TransactionType } from "../types/transaction";
import "../styles/AddTransactionModal.scss";

type AddTransactionModalProps = {
  onClose: () => void;
  onAdded: (transaction: Transaction) => void;
};

export default function AddTransactionModal({
  onClose,
  onAdded,
}: AddTransactionModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const transaction = await addTransaction({
        title: String(formData.get("title")),
        amount: Number(formData.get("amount")),
        type: String(formData.get("type")) as TransactionType,
      });
      onAdded(transaction);
      onClose();
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : "Unknown error.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="AddTransactionModal-backdrop" onMouseDown={onClose}>
      <div
        aria-labelledby="add-transaction-title"
        aria-modal="true"
        className="AddTransactionModal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="AddTransactionModal-header">
          <h2 id="add-transaction-title">Add Transaction</h2>
          <button
            aria-label="Close modal"
            className="AddTransactionModal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              autoFocus
              maxLength={100}
              name="title"
              required
              type="text"
            />
          </label>
          <label>
            Amount
            <input
              min="0.01"
              name="amount"
              required
              step="0.01"
              type="number"
            />
          </label>
          <label>
            Type
            <select name="type">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          {error && <p className="AddTransactionModal-error">{error}</p>}
          <div className="AddTransactionModal-actions">
            <button onClick={onClose} type="button">Cancel</button>
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Adding…" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
