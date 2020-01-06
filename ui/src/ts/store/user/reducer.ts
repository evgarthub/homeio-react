import { UserState } from "./interfaces";

export const userReducer = (state: UserState | undefined, action: any): UserState => {
    if (!state) {
        state = {
            name: 'default',
        };
    }

    switch (action.type) {
        default:
            return state;
    }
};
