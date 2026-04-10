const PaymentRouteCard = ({ type, name, isMini }) => {
  return (
    <div className={`route-card ${isMini ? "mini" : ""}`}>
      <div className="icon-circle">{type === "Paystack" ? "💳" : "🏦"}</div>
      <div className="route-text">
        <p className="route-name font-urbanist">{type}</p>
        <p className="route-acct">Acct name: {name || "Ayobami Olorunfemi"}</p>
      </div>
    </div>
  );
};

export default PaymentRouteCard;
