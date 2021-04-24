import { Component } from "react";
import { connect } from "react-redux";
import BitcoinLogo from "../../assets/images/wrapped-bitcoin-wbtc-logo.svg";
import "./SignupPage.scss";
import {
  login,
  signup,
  logout,
  getUsers,
} from "../../store/actions/usersAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


class _SignUpPage extends Component {
  state = {
    name: "",
    password: "",
    signUpName: "",
    signUpPassword: "",
    isSignUp: false,
  };

  async componentDidMount() {
    this.props.logout();
    this.props.getUsers();
  }

  handelChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value : target.value;
    this.setState((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  toggleIsSignUp() {
    this.setState((prevState) => {
      return { ...prevState, isSignUp: !this.state.isSignUp };
    });
  }

  login = async (ev) => {
    ev.preventDefault();
    try {
      await this.props.login(this.state.name, this.state.password);
      this.props.history.push(`/`);
    } catch {
      toast.warn("Wrong Username or password! Please switch to sign up if you don't have an account.", {position: toast.POSITION.TOP_CENTER})
    }
  };

  signUp = async (ev) => {
    ev.preventDefault();
    const user = {
      name: this.state.signUpName,
      password: this.state.signUpPassword,
      coins: 100,
      moves: [],
    };
    await this.props.signup(user);
    this.props.history.push(`/`);
  };

  render() {
    const { name, password, signUpName, signUpPassword, isSignUp } = this.state;
    return (
      <div className="signupPage">
        <ToastContainer />
        <h3>
          <img className="logo" src={BitcoinLogo} alt="" /> Please Log or Sign
          in to countinue
        </h3>
        {!isSignUp && (
          <form className="login" onSubmit={this.login}>
            <h4>Login</h4>
            <label htmlFor="name">
              Username:
              <input
                required
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handelChange}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                required
                type="number"
                id="password"
                name="password"
                value={password}
                onChange={this.handelChange}
              />
            </label>
            <Button
              variant="contained"
              onClick={(ev) => this.login(ev)}
              size="medium"
            >
              <ExitToAppIcon className="icon" />
              Log In
            </Button>
          </form>
        )}
        {isSignUp && (
          <form className="sign-up" onSubmit={this.signUp}>
            <h4>Or Sign Up</h4>
            <label htmlFor="name">
              Username:
              <input
                required
                type="text"
                id="name"
                name="signUpName"
                value={signUpName}
                onChange={this.handelChange}
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                required
                type="number"
                id="password"
                name="signUpPassword"
                value={signUpPassword}
                onChange={this.handelChange}
              />
            </label>
            <Button
              variant="contained"
              onClick={(ev) => this.signUp(ev)}
              size="medium"
            >
              <ExitToAppIcon className="icon" /> Sign Up
            </Button>
          </form>
        )}
        {!isSignUp && (
          <Button
            className="switch-btn"
            onClick={() => this.toggleIsSignUp()}
            variant="contained"
            size="medium"
          >
            Switch to Sign Up
          </Button>
        )}
        {isSignUp && (
          <Button
            className="switch-btn"
            onClick={() => this.toggleIsSignUp()}
            variant="contained"
            size="medium"
          >
            Switch to Login
          </Button>
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
const mapDispatchToProps = {
  login,
  signup,
  logout,
  getUsers,
};
export const SignupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SignUpPage);
