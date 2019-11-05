import { Droplet, Zap, Home, Thermometer, Props } from 'react-feather';
import { TypeNames } from '../../api/models';

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
}