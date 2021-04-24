import "./Chart.scss";
import { Sparklines, SparklinesLine } from "react-sparklines";

export function Chart({
  price,
  transactions,
  priceDetails,
  transactionsDetails,
}) {
  return (
    <div className="chart">
      <div className="price-chart-container">
        <h3>{priceDetails.name}</h3>
        <Sparklines data={price}>
          <SparklinesLine color="blue" />
        </Sparklines>
        <p>{priceDetails.description}</p>
      </div>
      <div className="transactions-chart-container">
        <h3>{transactionsDetails.name}</h3>
        <Sparklines data={transactions}>
          <SparklinesLine color="red" />
        </Sparklines>
        <p>{transactionsDetails.description}</p>
      </div>
    </div>
  );
}
