import * as React from "react";
import { Card, Loading } from "../../components";
import { getTypeIcon } from "../../utils";
import "./styles.scss";
import { getMonthName } from "../../utils/dataFormatter";
import { Record, Tariff, CostGroup } from "../../api";
import { IconProps } from "react-feather";
import { useMemo } from "react";
import { useRecordsQuery } from "../../queries/useRecordsQuery";
import { useTypesQuery } from "../../queries/useTypesQuery";
import { useTariffsQuery } from "../../queries/useTariffsQuery";

interface MonthTypeBill {
  cost: number;
  value: number;
  icon: React.ComponentType<IconProps>;
  displayName?: string;
  unit?: string;
}

export const Dashboard = () => {
  const { data: records, isLoading: isLoadingRecords } = useRecordsQuery();
  const { data: types, isLoading: isLoadingTypes } = useTypesQuery();
  const { data: tariffs, isLoading: isLoadingTariffs } = useTariffsQuery();

  const today = new Date();
  let total = 0;
  const get2LastRecords = (typeId: number, _records: Record[]): Record[] => {
    const last2Records = _records
      .filter((item) => item.type.id === typeId)
      .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

    return [last2Records[0], last2Records[1]];
  };

  const addToTotal = (added: number) => {
    if (added > 0) {
      total += added;
    }
  };

  const calcMonthBill = (
    last2Records: Record[],
    _tariffs: Tariff[],
    isAbsolute?: boolean
  ): number => {
    const tariff = tariffs?.find(
      (item) => item.type.id === last2Records[0].type.id
    );
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

  const typeBills: MonthTypeBill[] | undefined = useMemo(() => {
    if (!records?.length) return;
    if (!tariffs?.length) return;

    return types?.map((item) => {
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
  }, []);

  if (isLoadingRecords || isLoadingTypes || isLoadingTariffs) {
    return <Loading />;
  }

  return (
    <section className="month">
      <Card>
        <header className="month__header">
          <div className="month__total">{total.toFixed(2)} грн</div>
          <div className="month__name">{getMonthName(today)}</div>
        </header>
        <div className="month__highlights">
          {typeBills &&
            typeBills.map((item, i) => {
              const Icon = item.icon;

              return (
                <div key={i} className="month__type">
                  <div>{item.displayName}</div>
                  <div>
                    <Icon size={40} />
                  </div>
                  <div>
                    {item.value} {item.unit}
                  </div>
                  <div>{item.cost.toFixed(2)} грн</div>
                </div>
              );
            })}
        </div>
      </Card>
    </section>
  );
};
