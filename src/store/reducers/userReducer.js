const INITIAL_STATE = {
  currUser: null,
  users: [],
};

export function userReducer(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        currUser: action.user,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.user],
        currUser: action.user,
      };
      
    case "LOG_OUT":
      return {
        ...state,
        currUser: null,
      };
    default:
      return state;
  }
}
