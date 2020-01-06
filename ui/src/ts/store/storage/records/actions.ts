import { createAction } from "../../../utils/storeHelpers";
import { Record } from '../../../../api/models';

export const PUSH_RECORDS = '@api/PUSH_RECORDS';
export const pushRecords = (records: Record[]) => createAction(PUSH_RECORDS, records);
export type PushRecordsAction = ReturnType<typeof pushRecords>;
