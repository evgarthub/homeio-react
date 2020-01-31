import { RecordsState } from "./records/interfaces";
import { TypesState } from "./types/interfaces";
import { TariffsState } from "./tariffs/interfaces";

export interface StorageState {
    records: RecordsState;
    types: TypesState;
    tariffs: TariffsState;
}
