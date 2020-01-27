import * as React from 'react';
import { Droplet, Zap, Home, Thermometer, Props } from 'react-feather';
import { TypeNames } from '../../api/models';

enum MONTHS {
    'Січень' = 0,
    'Лютий' = 1,
    'Березень' = 2,
    'Квітень' = 3,
    'Травень' = 4,
    'Червень' = 5,
    'Липень' = 6,
    'Серпень' = 7,
    'Вересень' = 8,
    'Жовтень' = 9,
    'Листопад' = 10,
    'Грудень' = 11,
}

export const getTypeIcon = (type: TypeNames): React.ComponentType<Props> => {
    switch (type) {
        case TypeNames.WATER:
            return Droplet;
        case TypeNames.ELECTRICITY:
            return Zap;
        case TypeNames.MAINTENANCE:
            return Home;
        case TypeNames.HEAT:
            return Thermometer;
    }
};

export const getMonthName = (date: Date): string => {
    const monthIndex = date.getMonth();
    
    return MONTHS[monthIndex];
};