import { Dispatch } from "redux";
import { Type, typeService } from '../../../../api';
import { AxiosResponse } from "axios";
import { pushTypes } from "./actions";


export const fetchTypes = () => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Type[]> = await typeService.get();

        dispatch(pushTypes(response.data));
    };
};
