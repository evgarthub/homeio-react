
export interface Type {
    title: TypeNames;
    color?: string;
    provider?: string;
    displayName?: string;
    unit?: string;
    isAbsolute?: boolean;
    records?: any[];
    tariffs?: any[];
}

export interface Record {
    value: number;
    date: Date;
    type: Type;
}

export interface Tariff {
    source?: string;
    startDate: Date;
    type: Type;
    cost: CostGroup[];
}

export interface CostGroup {
    limit: number;
    price: number;
}

export enum TypeNames {
    WATER = 'water',
    ELECTRICITY = 'electricity',
    MAINTENANCE = 'maintenance',
    HEAT = 'heat',
}
