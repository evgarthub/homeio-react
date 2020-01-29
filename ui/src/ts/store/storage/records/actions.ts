import { createAction } from "../../../utils/storeHelpers";
import { Record } from '../../../../api/models';

export const PUSH_RECORDS = '@api/PUSH_RECORDS';
export const pushRecords = (records: Record[]) => createAction(PUSH_RECORDS, records);
export type PushRecordsAction = ReturnType<typeof pushRecords>;

export const PUSH_RECORD = '@api/PUSH_RECORD';
export const pushRecord = (record: Record) => createAction(PUSH_RECORD, record);
export type PushRecordAction = ReturnType<typeof pushRecord>;

export const UPDATE_RECORD = '@api/UPDATE_RECORD';
export const updateRecord = (record: Record) => createAction(UPDATE_RECORD, record);
export type UpdateRecordAction = ReturnType<typeof updateRecord>;

export const DELETE_RECORD = '@api/DELETE_RECORD';
export const deleteRecord = (id: number) => createAction(DELETE_RECORD, id);
export type DeleteRecordAction = ReturnType<typeof deleteRecord>;

export const SET_RECORDS = '@api/SET_RECORDS';
export const setRecords = (records: Record[]) => createAction(SET_RECORDS, records);
export type SetRecordsAction = ReturnType<typeof setRecords>;
