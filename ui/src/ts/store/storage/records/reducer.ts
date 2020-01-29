import { Action } from "redux";
import { DeleteRecordAction, DELETE_RECORD, PushRecordAction, PushRecordsAction, PUSH_RECORD, PUSH_RECORDS, SET_RECORDS, UpdateRecordAction, UPDATE_RECORD } from "./actions";
import { RecordsState } from "./interfaces";

export const recordsReducer = (state: RecordsState | undefined, action: Action): RecordsState => {
    if (!state) {
        state = [];
    }

    switch (action.type) {
        case SET_RECORDS:
            const records = (action as PushRecordsAction).payload;

            return records;

        case PUSH_RECORDS:
            const addedRecords = (action as PushRecordsAction).payload;

            return [
                ...state,
                ...addedRecords,
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
