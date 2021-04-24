import { userService } from "../../services/userService";

export function login(username, password) {
  return async (dispatch) => {
    const user = await userService.login(username, password);
    const action = {
      type: "SET_USER",
      user,
    };
    dispatch(action);
  };
}

export function signup(signUpUser) {
  return async (dispatch) => {
    const user = await userService.signup(signUpUser);
    const action = {
      type: "ADD_USER",
      user,
    };
    dispatch(action);
  };
}

export function logout() {
  return (dispatch) => {
    const action = {
      type: "LOG_OUT",
    };
    dispatch(action);
  };
}

export function getUsers() {
  return (dispatch) => {
    const users = userService.getUsers();
    const action = {
      type: "GET_USERS",
      users,
    };
    dispatch(action);
  };
}

export function transferCoins(move) {
  return async (dispatch) => {
    const { updatedUser, updatedContact } = await userService.addMove(move);
    dispatch({
      type: "SET_USER",
      user: updatedUser,
    });
    dispatch({
      type: "SET_CONTACT",
      currContact: updatedContact,
      currContactId: updatedContact._id,
    });
  };
}
