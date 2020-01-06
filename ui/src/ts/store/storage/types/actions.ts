import { createAction } from "../../../utils/storeHelpers";
import { Type } from '../../../../api/models';

export const PUSH_TYPES = '@api/PUSH_TYPES';
export const pushTypes = (types: Type[]) => createAction(PUSH_TYPES, types);
export type PushTypesAction = ReturnType<typeof pushTypes>;
