import React, { Component } from "react";
import { Header } from "../../components/Header/Header";
import { HomePage } from "../HomePage/HomePage";
import { ContactPage } from "../ContactPage";
import { StatisticPage } from "../StatisticPage/StatisticPage";
import { ContactDetailsPage } from "../../pages/ContactDetailsPage";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ContactEditPage } from "../ContactEditPage";
import { SignupPage } from "../SignupPage/SignupPage";
import { connect } from "react-redux";
import { logout } from "../../store/actions/usersAction";

class _BitcoinApp extends Component {
  componentDidMount() {

  }

  render() {
    const PrivateRoute = (props) => {
      return this.props.currUser ? (
        <Route {...props} />
      ) : (
        <Redirect to="/signup" />
      );
    };
    return (
      <Router>
        <div className="bitcoin-app">
          {this.props.currUser && <Header/>}
          <div className="app-container main-container">
            <Switch>
              <PrivateRoute
                component={ContactEditPage}
                path="/Contacts/edit/:id?"
              />
              <PrivateRoute
                component={ContactDetailsPage}
                path="/Contacts/:id"
              />
              <PrivateRoute component={StatisticPage} path="/Statistics" />
              <PrivateRoute component={ContactPage} path="/Contacts" />
              <Route component={SignupPage} path="/signup" />
              <PrivateRoute component={HomePage} path="/" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currUser: state.userReducer.currUser,
  };
};

const mapDispatchToProps = {
  logout,
};
export const BitcoinApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BitcoinApp);
