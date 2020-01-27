import * as React from 'react';
import { Card } from '../../components';
import { useSelector } from 'react-redux';
import { selectTypes } from '../../store/storage/types/selectors';
import { getTypeIcon } from '../../utils';
import './styles.scss';
import { selectRecords } from '../../store/storage/records/selectors';
import { selectTariffs } from '../../store/storage/tariffs/selectors';
import { getMonthName } from '../../utils/dataFormatter';
import { Record, Tariff } from '../../../api';
import { Props } from 'react-feather';

interface MonthTypeBill {
    amount: number;
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
    const [total, setTotal] = React.useState<number>(0);
    const get2LastRecords = (typeId: number, _records: Record[]): Record[] => {
        const last2Records = _records
        .filter(item => item.type.id === typeId)
        .sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);

        return [last2Records[0], last2Records[1]];
    };

    const calcMonthBill = (last2Records: Record[], _tariffs: Tariff[]): number => {
        const tariff = tariffs.find(item => item.type.id === last2Records[0].type.id);
        const diff = last2Records[0].value - last2Records[1].value;
        const amount = diff * tariff!.cost[0].price;

        addToTotal(amount);
        return amount;
    };

    const typeBills: MonthTypeBill[] | null = React.useMemo(() => {
        if (records && records.length && tariffs && tariffs.length) {
            return types && types.map(item => {
                const { displayName, title, id, unit } = item;
                const icon = getTypeIcon(title);
                
                const lastRecords = get2LastRecords(id, records);
                const amount = calcMonthBill(lastRecords, tariffs);
                
                return {
                    value: lastRecords && lastRecords[0] && lastRecords[0].value,
                    amount,
                    displayName,
                    unit,
                    icon,
                };
            });
        }
        return null;
    }, [types.length, records.length, tariffs.length]);

    const addToTotal = (added: number) => added > 0 && setTotal(total + added);

    return (
        <section className="month">
            <Card>
                <header className="month__header">
                    <div className="month__total">{total}</div>
                    <div className="month__name">{getMonthName(today)}</div>
                </header>
                <div className="month__highlights">
                    {typeBills && typeBills.map((item, i) => {
                        const Icon = item.icon;

                        return (
                            <div key={i} className="month__type">
                                <div>{item.displayName}</div>
                                <div><Icon size={40} /></div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </section>
    );
};
