import { ServiceState } from "./service";
import { UserState } from "./user";
import { StorageState } from "./storage";

export interface State {
    service: ServiceState;
    user: UserState;
    storage: StorageState;
}