import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { contactsReducer } from "./reducers/contactsReducer";
import { userReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ contactsReducer, userReducer });
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
