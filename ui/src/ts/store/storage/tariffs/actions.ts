import { createAction } from "../../../utils/storeHelpers";
import { Tariff } from '../../../../api/models';

export const PUSH_TARIFFS = '@api/PUSH_TARIFFS';
export const pushTariffs = (tariffs: Tariff[]) => createAction(PUSH_TARIFFS, tariffs);
export type PushTariffsAction = ReturnType<typeof pushTariffs>;
