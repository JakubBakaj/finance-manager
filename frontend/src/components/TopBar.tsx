import "../styles/TopBar.scss";
import CashStatus from "./CashStatus";

type TopBarProps = {
  balance: number;
};

export default function TopBar({ balance }: TopBarProps) {
  return (
    <header className="TopBar">
      <h1>Finance Manager</h1>
      <CashStatus balance={balance} />
    </header>
  );
}
