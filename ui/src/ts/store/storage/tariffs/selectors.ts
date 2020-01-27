import { State } from "../../interfaces";

export const selectTariffs = (state: State) => state.storage.tariffs;