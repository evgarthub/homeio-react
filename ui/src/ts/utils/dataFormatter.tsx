import * as React from 'react';
import { Droplet, Zap, Home, Thermometer } from 'react-feather';
import { TypeNames } from '../../api/models';

export const getTypeIcon = (type: TypeNames) => {
    switch (type) {
        case TypeNames.WATER:
            return <Droplet />;
        case TypeNames.ELECTRICITY:
            return <Zap />;
        case TypeNames.MAINTENANCE:
            return <Home />;
        case TypeNames.HEAT:
            return <Thermometer />;
    }
}