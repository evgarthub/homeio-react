import * as React from 'react';
import recordsService from '../../../api/services/Records';
import { Record, TypeNames } from '../../../api/models';
import { AxiosResponse } from 'axios';
import { Card, Loading } from '../../components';
import { formatDate, getTypeIcon } from '../../utils';
import './styles.scss';
import { Droplet, Zap, Thermometer, Home, Check, X, Edit } from 'react-feather';
import { DatePicker, InputNumber, Select, Button } from 'antd';
import moment, { Moment } from 'moment';

export const RecordsPage = () => {
    const [records, setRecords] = React.useState<Record[]>();
    const [newRecords, setNewRecord] = React.useState<Record[]>();
    

    React.useEffect(() => {
        recordsService.get()
            .then((resp: AxiosResponse<Record[]>) => {
                setRecords(resp.data);
            })
    }, []);

    const handleAddNew = () => {
        setNewRecord([
            {
                value: 0,
                date: new Date(),
                type: {
                    title: TypeNames.ELECTRICITY,
                },
            },
            ...newRecords || [],
        ]);
    };
    
    const handleChange = (value: Record, index: number) => {
        const updatedRecords = [...newRecords || []];
        updatedRecords[index] = value;
        setNewRecord(updatedRecords);
    };

    const handleDelete = (id: number) => console.log('delete: ', id);

    const handleCancel = (index: number) => {
        const updatedRecords = newRecords && newRecords.filter((item, i) => index !== i);

        setNewRecord(updatedRecords);
    };
    
    if (records) {
        return (
            <div className='records-page'>
                <div className='records-page__header'>
                    <div className='records-page__filters'>
                        <Card color='white'>All</Card>
                        <Card color='white'><Droplet /></Card>
                        <Card color='white'><Zap /></Card>
                        <Card color='white'><Thermometer /></Card>
                        <Card color='white'><Home /></Card>
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
                    {records && records.map((record: Record, i: number) => (
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
    }
        
    return <Loading />;
};

interface RecordRowProps {
    index: number;
    record: Record;
    readonly: boolean;
    onChange: (value: Record, index: number) => void;
    onCancel: (index: number) => void;
}

const RecordRow = (props: RecordRowProps) => {
    const { Option } = Select;
    const [localValue, setLocalValue] = React.useState<Record>(props.record);
    const [readonly, setReadOnly] = React.useState<boolean>(props.readonly);
    const dateFormat = 'YYYY/MM/DD';
    const Icon = getTypeIcon(props.record.type.title);
    const precision = (): number => {
        switch (props.record.type.title) {
            case TypeNames.ELECTRICITY:
                return 100;

            case TypeNames.HEAT:
                return 0.001;
            
            case TypeNames.WATER:
            case TypeNames.MAINTENANCE:
            default:
                return 1;
        }
    };

    const handleSave = () => {
        props.onChange(localValue, props.index);
        setReadOnly(true);
    }
    const handleCancel = () => {
        props.onCancel(props.index);
        setReadOnly(true);
    }
    const handleEditing = () => setReadOnly(false);

    const handleDateChange = (date: Moment | null, dateString: string) => {
        if (date) {
            setLocalValue({
                ...localValue,
                date: date.toDate(),
            })
        }
    };

    const handleValueChange = (value: number | undefined) => {
        if (value) {
            setLocalValue({
                ...localValue,
                value,
            })
        }
    };

    const handleTypeChange = (type: TypeNames) => {
        if (type) {
            setLocalValue({
                ...localValue,
            })
        }
    };

    return (
        <Card className='record-card' color='white' >
            <Card color='grey' isTransparent={true} title={localValue.type.displayName}>
                {readonly
                    ? (
                        <div className='record-card__icon'>
                            {Icon}
                        </div>
                    )
                    : (
                        <Select defaultValue={props.record.type.title} onChange={handleTypeChange}>
                            <Option value={TypeNames.WATER}><Droplet /></Option>
                            <Option value={TypeNames.ELECTRICITY}><Zap /></Option>
                            <Option value={TypeNames.HEAT}><Thermometer /></Option>
                            <Option value={TypeNames.MAINTENANCE}><Home /></Option>
                        </Select>
                    )
                }
            </Card>
            <div className='record-card__content'>
                {readonly
                    ? <span>{formatDate(props.record.date)}</span>
                    : (
                        <DatePicker
                            defaultValue={moment(new Date(), dateFormat)}
                            value={moment(localValue.date, dateFormat)}
                            onChange={handleDateChange}
                            allowClear={false}
                        />
                    )
                }
                {readonly
                    ? <span>{props.record.value} {props.record.type.unit}</span>
                    : (
                        <InputNumber
                            className='record-card__value'
                            value={localValue.value}
                            min={props.record.value}
                            step={precision()}
                            onChange={handleValueChange}
                            formatter={value => `${value} ${localValue.type.unit ? localValue.type.unit : ''}`}
                        />
                    )
                }
            </div>
            <div className='record-card__actions'>
                {readonly
                    ? <Button className='record-card__action' onClick={handleEditing}><Edit /></Button>
                    : (<React.Fragment>
                        <Button className='record-card__action' type='primary' onClick={handleSave} ><Check /></Button>
                        <Button className='record-card__action' onClick={handleCancel} ><X /></Button>
                    </React.Fragment>)
                }
            </div>
        </Card>
    )
}
