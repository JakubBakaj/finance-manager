import "../styles/CashStatus.scss";
import { formatCurrency } from "../lib/currency";

type CashStatusProps = {
  balance: number;
};

export default function CashStatus({ balance }: CashStatusProps) {
  return (
    <div className="CashStatus">
      <p className="CashStatus-balance">
        Cash balance:{" "}
        <span
          className={`CashStatus-amount ${balance < 0 ? "is-negative" : ""}`}
        >
          {formatCurrency(balance)}
        </span>
      </p>
    </div>
  );
}
