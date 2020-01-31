import * as React from 'react';
import { Card } from '../../components';
import { useSelector } from 'react-redux';
import { selectTypes } from '../../store/storage/types/selectors';
import { getTypeIcon } from '../../utils';
import './styles.scss';
import { selectRecords } from '../../store/storage/records/selectors';
import { selectTariffs } from '../../store/storage/tariffs/selectors';
import { getMonthName } from '../../utils/dataFormatter';
import { Record, Tariff, CostGroup } from '../../../api';
import { Props } from 'react-feather';

interface MonthTypeBill {
    cost: number;
    value: number;
    icon: React.ComponentType<Props>;
    displayName?: string;
    unit?: string;
}

export const Dashboard = () => {
    const types = useSelector(selectTypes);
    const records = useSelector(selectRecords);
    const tariffs = useSelector(selectTariffs);
    const today = new Date();
    let total = 0;
    const get2LastRecords = (typeId: number, _records: Record[]): Record[] => {
        const last2Records = _records
        .filter(item => item.type.id === typeId)
        .sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);

        return [last2Records[0], last2Records[1]];
    };
    
    const addToTotal = (added: number) => {
        if (added > 0) {
            total += added;
        }
    };

    const calcMonthBill = (last2Records: Record[], _tariffs: Tariff[], isAbsolute?: boolean): number => {
        const tariff = tariffs.find(item => item.type.id === last2Records[0].type.id);
        const diff = last2Records[0].value - last2Records[1].value;
        let tariffPrice = 0;
        let cost = 0;

        if (tariff && tariff.costs && tariff.costs.length) {
            tariffPrice = tariff && tariff.costs[0].value;
            cost = diff * tariffPrice;

            if (tariff.costs.length > 1) {
                let _diff = diff;
                cost = tariff.costs.reduce((acc: number, item: CostGroup) => {
                    if (item.limit) {
                        _diff -= item.limit;
                        return acc + item.limit * item.value;
                    }

                    return acc + _diff * item.value;
                }, 0);
            }


            if (isAbsolute) {
                cost = last2Records[0].value * tariffPrice;
            }
        }


        addToTotal(cost);
        return cost;
    };

    const typeBills: MonthTypeBill[] | null = React.useMemo(() => {
        if (records && records.length && tariffs && tariffs.length) {
            return types && types.map(item => {
                const { displayName, title, id, unit } = item;
                const icon = getTypeIcon(title);
                
                const lastRecords = get2LastRecords(id, records);
                const cost = calcMonthBill(lastRecords, tariffs, item.isAbsolute);
                
                return {
                    value: lastRecords && lastRecords[0] && lastRecords[0].value,
                    cost,
                    displayName,
                    unit,
                    icon,
                };
            });
        }
        return null;
    }, [types.length, records.length, tariffs.length]);

    return (
        <section className="month">
            <Card>
                <header className="month__header">
                    <div className="month__total">{total.toFixed(2)} грн</div>
                    <div className="month__name">{getMonthName(today)}</div>
                </header>
                <div className="month__highlights">
                    {typeBills && typeBills.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <div key={i} className="month__type">
                                <div>{item.displayName}</div>
                                <div><Icon size={40} /></div>
                                <div>{item.value} {item.unit}</div>
                                <div>{item.cost.toFixed(2)} грн</div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </section>
    );
};
