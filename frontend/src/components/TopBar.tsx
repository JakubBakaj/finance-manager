import "../styles/TopBar.scss";
import CashStatus from "./CashStatus";

export default function TopBar() {
  return (
    <header className="TopBar">
      <h1>Finance Manager</h1>
      <CashStatus />
    </header>
  );
}
