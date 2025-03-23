import { Record, TypeNames, Type } from "../../api/models";
import { Card, Loading } from "../../components";
import { getTypeIcon } from "../../utils";
import "./styles.scss";
import { Button } from "antd";
import { RecordRow } from "./RecordRow";
import { Grid, Plus } from "react-feather";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { typeService } from "../../api";
import { useRecordsQuery } from "../../queries/useRecordsQuery";

export const RecordsPage = () => {
  const { data: records, isLoading: isLoadingRecords } = useRecordsQuery();

  const recordsSorted = useMemo(() => {
    return records?.sort((a, b) =>
      a.date > b.date ? -1 : a.date < b.date ? 1 : 0
    );
  }, [records]);

  const { data: types } = useQuery({
    queryKey: ["types"],
    queryFn: async () => (await typeService.get()).data,
  });

  const [newRecords, setNewRecord] = useState<Record[]>([]);
  const [filter, setFilter] = useState<string[]>();

  const handleAddNew = () => {
    setNewRecord((prevRecords) => [
      {
        value: 0,
        date: new Date(),
        type: {
          title: TypeNames.ELECTRICITY,
          id: 1,
        },
      },
      ...prevRecords,
    ]);
  };

  const handleChange = (index: number, value: Record) => {
    const updatedRecords = [...newRecords];
    updatedRecords[index] = value;
    setNewRecord(updatedRecords);
  };

  const handleCancel = (index: number) => {
    const updatedRecords =
      newRecords && newRecords.filter((_item, i) => index !== i);

    setNewRecord(updatedRecords);
  };

  const handleFilter = (type?: Type) => {
    if (type) {
      if (filter && filter.includes(type.title)) {
        const newFilter = filter.filter((item) => item !== type.title);

        setFilter(newFilter);
      } else {
        setFilter([...(filter || []), type.title]);
      }
    } else {
      setFilter([]);
    }
  };

  const handleAllFilter = () => handleFilter();

  if (isLoadingRecords) {
    return <Loading />;
  }

  return (
    <div className="records-page">
      <div className="records-page__header">
        <div className="records-page__filters">
          <button
            className={`records-page__filter${
              !filter || !filter.length ? " records-page__filter--active" : ""
            }`}
            onClick={handleAllFilter}
          >
            <Card color="white" title="All">
              <Grid color="black" />
            </Card>
          </button>
          {types?.map((item) => {
            const Icon = getTypeIcon(item.title);
            const onFilter = () => handleFilter(item);

            return (
              <button
                className={`records-page__filter${
                  filter && filter.length && filter.includes(item.title)
                    ? " records-page__filter--active"
                    : ""
                }`}
                onClick={onFilter}
                key={item.title}
              >
                <Card color="white" title={item.displayName}>
                  <Icon color="black" />
                </Card>
              </button>
            );
          })}
        </div>

        <Button
          className="records-page__add"
          type="primary"
          size="large"
          shape="circle"
          icon={<Plus />}
          onClick={handleAddNew}
        />
      </div>
      <div className="records-page__list">
        {newRecords.map((record: Record, i: number) => (
          <RecordRow
            key={`${record.value}-${record.date}-${newRecords.length - i}`}
            index={i}
            record={record}
            onChange={handleChange}
            onCancel={handleCancel}
            readonly={false}
          />
        ))}
        {recordsSorted
          ?.filter((record) =>
            filter && filter.length ? filter.includes(record.type.title) : true
          )
          .map((record: Record, i: number) => (
            <RecordRow
              key={`${record.value}-${record.date}-${i}`}
              index={i}
              record={record}
              onChange={handleChange}
              onCancel={handleCancel}
              readonly={true}
            />
          ))}
      </div>
    </div>
  );
};
