import { RecordsState } from "./interfaces";
import { Action } from "redux";
import { PUSH_RECORDS, PushRecordsAction } from "./actions";

export const recordsReducer = (state: RecordsState | undefined, action: Action): RecordsState => {
    if (!state) {
        state = [];
    }

    switch (action.type) {
        case PUSH_RECORDS:
            const records = (action as PushRecordsAction).payload;

            return [
                ...state,
                ...records,
            ]

        default:
            return state;
    }
};
