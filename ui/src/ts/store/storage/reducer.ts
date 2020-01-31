import { StorageState } from "./interfaces";
import { combineReducers } from "redux";
import { recordsReducer } from "./records/reducer";
import { typesReducer } from "./types/reducer";
import { tariffsReducer } from "./tariffs/reducer";

export const storageReducer = combineReducers<StorageState>({
    records: recordsReducer,
    types: typesReducer,
    tariffs: tariffsReducer,
});
