import { useEffect, useMemo, useState } from "react";
import { getTransactions } from "./api/transactions";
import TopBar from "./components/TopBar";
import Stats from "./components/Stats.tsx";
import History from "./components/History.tsx";
import type { Transaction } from "./types/transaction";
import "./styles/App.scss";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getTransactions(controller.signal)
      .then(setTransactions)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError(reason instanceof Error ? reason.message : "unknown error");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  const summary = useMemo(
    () =>
      transactions.reduce(
        (result, transaction) => {
          result[transaction.type] += transaction.amount;
          return result;
        },
        { income: 0, expense: 0 },
      ),
    [transactions],
  );

  return (
    <div className="App">
      <TopBar balance={summary.income - summary.expense} />
      <main className="App-content">
        <Stats income={summary.income} expense={summary.expense} />
        <History transactions={transactions} isLoading={isLoading} error={error} />
      </main>
    </div>
  );
}
