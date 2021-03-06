import { TypesState } from "./interfaces";
import { Action } from "redux";
import { PUSH_TYPES, PushTypesAction } from "./actions";

export const typesReducer = (state: TypesState | undefined, action: Action): TypesState => {
    if (!state) {
        state = [];
    }

    switch (action.type) {
        case PUSH_TYPES:
            return (action as PushTypesAction).payload;

        default:
            return state;
    }
};
