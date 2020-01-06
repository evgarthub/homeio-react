import { Dispatch } from "redux";
import { recordService, Record } from '../../../../api';
import { AxiosResponse } from "axios";
import { pushRecords } from "./actions";


export const fetchRecords = () => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Record[]> = await recordService.get();

        dispatch(pushRecords(response.data));
    };
};
