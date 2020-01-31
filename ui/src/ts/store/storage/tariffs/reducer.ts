import { TariffsState } from "./interfaces";
import { Action } from "redux";
import { PUSH_TARIFFS, PushTariffsAction } from "./actions";

export const tariffsReducer = (state: TariffsState | undefined, action: Action): TariffsState => {
    if (!state) {
        state = [];
    }

    switch (action.type) {
        case PUSH_TARIFFS:
            const tariffs = (action as PushTariffsAction).payload;

            return [
                ...state,
                ...tariffs,
            ]

        default:
            return state;
    }
};
