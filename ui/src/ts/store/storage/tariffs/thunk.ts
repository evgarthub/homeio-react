import { Dispatch } from "redux";
import { Tariff, tariffService } from '../../../../api';
import { AxiosResponse } from "axios";
import { pushTariffs } from "./actions";


export const fetchTariffs = () => {

    return async (dispatch: Dispatch) => {
        const response: AxiosResponse<Tariff[]> = await tariffService.get();

        dispatch(pushTariffs(response.data));
    };
};
