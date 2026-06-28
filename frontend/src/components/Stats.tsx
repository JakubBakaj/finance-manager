import "../styles/Stats.scss";
import { formatCurrency } from "../lib/currency";

type StatsProps = {
  income: number;
  expense: number;
};

export default function Stats({ income, expense }: StatsProps) {
  return (
    <div className="Stats">
      <h2 className="Stats-title">Summary</h2>
      <dl className="Stats-list">
        <div>
          <dt>Income</dt>
          <dd className="Stats-income">{formatCurrency(income)}</dd>
        </div>
        <div>
          <dt>Expenses</dt>
          <dd className="Stats-expense">{formatCurrency(expense)}</dd>
        </div>
      </dl>
    </div>
  );
}
