import { RecordsState } from "./interfaces";
import { Action } from "redux";
import { PUSH_RECORDS, PushRecordsAction, PUSH_RECORD, PushRecordAction, UPDATE_RECORD, UpdateRecordAction, DELETE_RECORD, DeleteRecordAction } from "./actions";

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
            ];

        case PUSH_RECORD:
            const record = (action as PushRecordAction).payload;

            return [
                record,
                ...state,
            ];

        case UPDATE_RECORD:
            const updatedRecord = (action as UpdateRecordAction).payload;
            const newState = state.map(item => {
                if (item.id === updatedRecord.id) {
                    return updatedRecord;
                }

                return item;
            });

            return newState;

        case DELETE_RECORD:
            const stateWithoutRecord = state.filter(item => item.id !== (action as DeleteRecordAction).payload);

            return stateWithoutRecord;

        default:
            return state;
    }
};
