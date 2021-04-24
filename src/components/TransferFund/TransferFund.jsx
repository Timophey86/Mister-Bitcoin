import { Component } from "react";
import TextField from "@material-ui/core/TextField";

import "./TransferFund.scss";

export class TransferFund extends Component {
  state = {
    amount: "",
  };
  componentDidMount() {}
  handelChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value : target.value;
    this.setState((prevState) => {
      return { ...prevState, [field]: value };
    });
  };
  render() {
    const { contact, onTransferCoins } = this.props;
    const { amount } = this.state;
    return (
      <form
        className="transferFund"
        onSubmit={(ev) => {
          onTransferCoins(ev, amount);
        }}
      >
        <h4>Transfer coins to {contact.name}</h4>
        <label htmlFor="coins">
          <TextField
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={this.handelChange}
            label="Amount"
          />
          <button>Transfer</button>
        </label>
      </form>
    );
  }
}
