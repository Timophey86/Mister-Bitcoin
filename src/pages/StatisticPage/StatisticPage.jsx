import { bitcoinService } from "../../services/bitcoinService";
import { Component } from "react";
import { Chart } from "../../components/Chart";

import "./StatisticPage.scss";

export class StatisticPage extends Component {
  state = {
    price: null,
    transactions: null,
  };

  componentDidMount() {
    this.getMarketPrice();
    this.getTransactions();
  }

  async getMarketPrice() {
    const price = await bitcoinService.getMarketPrice();
    this.setState({ price });
  }
  async getTransactions() {
    const transactions = await bitcoinService.getConfirmedTransactions();
    this.setState({ transactions });
  }

  get priceForChart() {
    return this.state.price.values.map((item) => item.y);
  }

  get transactionsForChart() {
    return this.state.transactions.values.map((item) => item.y);
  }

  render() {
    const { price, transactions } = this.state;
    return (
      <div>
        {price && transactions && (
          <Chart price={this.priceForChart} priceDetails={price} transactionsDetails={transactions} transactions={this.transactionsForChart} />
        )}
      </div>
    );
  }
}
