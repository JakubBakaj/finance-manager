import "../styles/CashStatus.scss";

export default function CashStatus() {
  return (
    <div className="CashStatus">
      {/* Display the current cash balance here, it will use the cashBalance state variable which will get the data from the api */}
      <p className="CashStatus-balance">
        Current cash balance: <span className="CashStatus-amount">1000 zł</span>
      </p>
    </div>
  );
}
