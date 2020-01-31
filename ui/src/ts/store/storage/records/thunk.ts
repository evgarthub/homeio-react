import { Dispatch } from "redux";
import { recordService, Record } from '../../../../api';
import { AxiosResponse } from "axios";
import { setRecords, pushRecord, updateRecord, deleteRecord } from "./actions";


export const fetchRecords = () => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Record[]> = await recordService.get();

        dispatch(setRecords(response.data));
    };
};

export const postRecord = (record: Record) => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Record> = await recordService.post(record);

        dispatch(pushRecord(response.data));
    };
};

export const putRecord = (record: Record) => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Record> = await recordService.put(record.id!, record);

        dispatch(updateRecord(response.data));
    };
};

export const removeRecord = (id: number) => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Record> = await recordService.remove(id);
        
        if (response.status === 200) {
            dispatch(deleteRecord(id));
        }
    };
};
