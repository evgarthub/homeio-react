import { ServiceState } from "./interfaces";

export const serviceReducer = (state: ServiceState | undefined, action: any): ServiceState => {
    if (!state) {
        state = {
            isLoading: false,
        };
    }

    switch (action.type) {
        default:
            return state;
    }
};
