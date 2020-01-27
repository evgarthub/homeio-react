import * as React from 'react';
import { Record, TypeNames, Type } from '../../../api/models';
import { Card, Loading } from '../../components';
import { getTypeIcon } from '../../utils';
import './styles.scss';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecords } from '../../store/storage/records/thunk';
import { selectRecords } from '../../store/storage/records/selectors';
import { fetchTypes } from '../../store/storage/types/thunk';
import { selectTypes } from '../../store/storage/types/selectors';
import { RecordRow } from './RecordRow';
import { Grid } from 'react-feather';

export const RecordsPage = () => {
    const records = useSelector(selectRecords).sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
    const types = useSelector(selectTypes);
    const [newRecords, setNewRecord] = React.useState<Record[]>();
    const [filter, setFilter] = React.useState<string[]>();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (records && !records.length) {
            dispatch(fetchRecords());
        }

        if (types && !types.length) {
            dispatch(fetchTypes());
        }
    }, [records, types]);

    const handleAddNew = () => {
        setNewRecord([
            {
                value: 0,
                date: new Date(),
                type: {
                    title: TypeNames.ELECTRICITY,
                    id: 1,
                },
            },
            ...newRecords || [],
        ]);
    };
    
    const handleChange = (index: number, value: Record) => {
        const updatedRecords = [...newRecords || []];
        updatedRecords[index] = value;
        setNewRecord(updatedRecords);
    };

    const handleCancel = (index: number) => {
        const updatedRecords = newRecords && newRecords.filter((item, i) => index !== i);

        setNewRecord(updatedRecords);
    };

    const handleFilter = (type?: Type) => {
        if (type) {
            if (filter && filter.includes(type.title)) {
                const newFilter = filter.filter(item => item !== type.title);
    
                setFilter(newFilter);
            } else {
                setFilter([...filter || [], type.title]);
            }
        } else {
            setFilter([]);
        }
    };

    const handleAllFilter = () => handleFilter();
    
    if (records && records.length) {
        return (
            <div className='records-page'>
                <div className='records-page__header'>
                    <div className='records-page__filters'>
                        <button
                            className={`records-page__filter${!filter || !filter.length ? ' records-page__filter--active' : ''}`}
                            onClick={handleAllFilter}
                        >
                            <Card color='white' title='All'><Grid /></Card> 
                        </button>
                        {types.map(item => {
                            const Icon = getTypeIcon(item.title);
                            const onFilter = () => handleFilter(item);

                            return (
                                <button 
                                    className={`records-page__filter${filter && filter.length && filter.includes(item.title)
                                        ? ' records-page__filter--active' : ''}`}
                                    onClick={onFilter}
                                >
                                    <Card key={item.title} color='white' title={item.displayName}><Icon /></Card>
                                </button>
                            );
                        })}
                    </div>

                    <Button className='records-page__add' type='primary' size='large' shape="circle" icon="plus" onClick={handleAddNew} />
                </div>
                <div className='records-page__list'>
                    {newRecords && newRecords.map((record: Record, i: number) => (
                        <RecordRow
                            key={`${record.value}-${record.date}-${newRecords.length - i}`}
                            index={i}
                            record={record}
                            onChange={handleChange}
                            onCancel={handleCancel}
                            readonly={false}
                        />
                    ))}
                    {records && records
                        .filter(record => filter && filter.length ? filter.includes(record.type.title) : true)
                        .map((record: Record, i: number) => (
                            <RecordRow
                                key={`${record.value}-${record.date}-${i}`}
                                index={i}
                                record={record}
                                onChange={handleChange}
                                onCancel={handleCancel}
                                readonly={true}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
        
    return <Loading />;
};
