import { Dispatch, AnyAction } from "redux";
import * as React from "react";
import { useDispatch } from "react-redux";

export const createAction = <T>(type: string, payload: T) => {

    return({
        type,
        payload,
    });
};

export const useDispatchOnMount = (action: (dispatch: Dispatch<AnyAction>) => Promise<void>) => {
    const dispatch = useDispatch();

    return React.useEffect(() => {
        dispatch(action);
    }, []);
};
