import { State } from "./interfaces";
import { combineReducers, Reducer } from "redux";
import { serviceReducer } from "./service";
import { storageReducer } from "./storage";
import { userReducer } from './user';

export const rootReducer = combineReducers({
  service: serviceReducer,
  user: userReducer,
  storage: storageReducer,
});
