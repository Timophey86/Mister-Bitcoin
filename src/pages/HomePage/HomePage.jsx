import React, { Component } from "react";
import { userService } from "../../services/userService";
import { bitcoinService } from "../../services/bitcoinService";
import { connect } from "react-redux";
import "./home-page.scss";
import { MoveList } from "../../components/MoveList/MoveList";

class _HomePage extends Component {
  state = {
    user: null,
    rate: null,
  };

  async componentDidMount() {
    if (this.props.currUser) {
      this.setState({ user: this.props.currUser }, this.getCurrRate);
    } else {
      this.loadUser();
      this.getCurrRate();
    }
  }

  loadUser() {
    const user = userService.getUser();
    this.setState({ user });
  }

  async getCurrRate() {
    const rate = await bitcoinService.getRate();
    this.setState({ rate });
  }

  get rateFormated() {
    return this.state.rate.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  render() {
    const { user, rate } = this.state;

    return (
      <div>
        {user && (
          <div className="user-card">
            <div className="user-img-container">
              <img
                className="user-img"
                src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Karamo_Brown_in_2019.jpg"
                alt=""
              />
            </div>
            <h3>Welcome {user.name}</h3>
            <p>
              You currently have <span className="coin-amounts">{user.coins}</span> coins.
            </p>
          </div>
        )}
        {rate && (
          <div>
            <h3 className="currRate">
              Current Bitcoin rate: {this.rateFormated}
            </h3>

            <MoveList moves={user.moves} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.userReducer.currUser,
  };
};
export const HomePage = connect(mapStateToProps)(_HomePage);
