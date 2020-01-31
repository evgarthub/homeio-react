import * as React from 'react';
import { Record, TypeNames } from '../../../../api';
import { Select, DatePicker, InputNumber, Button, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectTypes } from '../../../store/storage/types/selectors';
import { getTypeIcon, formatDate } from '../../../utils';
import moment, { Moment } from 'moment';
import { Card } from '../../../components';
import { Check, X, Edit, Trash } from 'react-feather';
import './styles.scss';
import { postRecord, putRecord, removeRecord } from '../../../store/storage/records/thunk';

interface RecordRowProps {
    index: number;
    record: Record;
    readonly: boolean;
    onChange: (index: number, value: Record) => void;
    onCancel: (index: number) => void;
}

export const RecordRow = (props: RecordRowProps) => {
    const { Option } = Select;
    const [localValue, setLocalValue] = React.useState<Record>(props.record);
    const [readonly, setReadOnly] = React.useState<boolean>(props.readonly);
    const dateFormat = 'YYYY/MM/DD';
    const types = useSelector(selectTypes);
    const Icon = getTypeIcon(props.record.type.title);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(postRecord(localValue));
        props.onCancel(props.index);
    }
    const handleUpdate = () => {
        dispatch(putRecord(localValue));
    }
    const handleChange = () => {
        props.onChange(props.index, localValue);
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

    const handleTypeChange = (type: number) => {
        if (type) {
            setLocalValue({
                ...localValue,
                type: types.find(item => item.id === type)!,
            })
        }
    };

    const handleDelete = () => {
        dispatch(removeRecord(localValue.id!));
    }

    return (
        <Card className='record-card' color='white'>
            {readonly
                    ? (
                        <Card color='grey' isTransparent={true} title={localValue.type.displayName}>
                            <div className='record-card__icon'>
                                <Icon />
                            </div>
                        </Card>
                    )
                    : (
                        <Select defaultValue={props.record.type.id} onChange={handleTypeChange}>
                            {types.map(item => {
                                const Icon = getTypeIcon(item.title);

                                return (
                                    <Option key={item.title} value={item.id}>
                                        <div className='record-card__icon'><Icon /></div>
                                    </Option>
                                );
                            })}
                        </Select>
                    )
                }
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
                        <div>
                            <InputNumber
                                className='record-card__value'
                                value={localValue.value}
                                min={props.record.value}
                                onChange={handleValueChange}
                            />
                            <span> {localValue.type.unit}</span>
                        </div>
                    )
                }
            </div>
            <div className='record-card__actions'>
                {readonly
                    ? (<React.Fragment>
                        <Button
                            className='record-card__action'
                            onClick={handleEditing}
                            title="Edit record"
                        >
                            <Edit />
                        </Button>
                        <Popconfirm
                            title="Please confirm deletion of this Record?"
                            onConfirm={handleDelete}
                            onCancel={handleCancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='record-card__action' title='Delete record'><Trash /></Button>
                        </Popconfirm>
                    </React.Fragment>)
                    : (<React.Fragment>
                        <Button
                            className='record-card__action'
                            type='primary'
                            onClick={localValue.id ? handleUpdate : handleSave}
                            title='Save record'
                        >
                            <Check />
                        </Button>
                        <Button
                            className='record-card__action'
                            onClick={handleCancel}
                            title='Cancel edits'
                        >
                            <X />
                        </Button>
                    </React.Fragment>)
                }
            </div>
        </Card>
    )
};
