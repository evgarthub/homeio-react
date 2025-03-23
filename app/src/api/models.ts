export interface Type {
  title: TypeNames;
  color?: string;
  provider?: string;
  displayName?: string;
  unit?: string;
  isAbsolute?: boolean;
  records?: any[];
  tariffs?: any[];
  id: number;
}

export interface Record {
  value: number;
  date: Date;
  type: Type;
  id?: number;
}

export interface Tariff {
  source?: string;
  startDate: Date;
  type: Type;
  costs: CostGroup[];
}

export interface CostGroup {
  limit: number;
  value: number;
}

export enum TypeNames {
  WATER = "water",
  ELECTRICITY = "electricity",
  MAINTENANCE = "maintenance",
  HEAT = "heat",
}

export interface CollectionList<TItem> {
  data: TItem[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
