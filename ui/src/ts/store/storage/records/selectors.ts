import { State } from "../../interfaces";

export const selectRecords = (state: State) => state.storage.records;