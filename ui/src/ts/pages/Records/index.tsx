import * as React from 'react';
import recordsService from '../../../api/services/Records';
import { Record } from '../../../api/models';
import { AxiosResponse } from 'axios';
import { Card, Button } from '../../components';
import { formatDate, getTypeIcon } from '../../utils';
import './styles.scss';
import { Droplet, Zap, Thermometer, Home, Plus } from 'react-feather';
import { Loading } from '../../components/';

export const RecordsPage = () => {
    const [records, setRecords] = React.useState<Record[]>();

    React.useEffect(() => {
        recordsService.get()
            .then((resp: AxiosResponse<Record[]>) => {
            setRecords(resp.data);
            console.log(resp.data)
            })
    }, []);
    
    if (records) {
        return (
            <div className='records-page'>
                <Card color='white'>
                    <div className='records-page__header'>
                        <div className='records-page__filters'>
                            <Card color='grey' isTransparent={true}>All</Card>
                            <Card color='grey' isTransparent={true}><Droplet /></Card>
                            <Card color='grey' isTransparent={true}><Zap /></Card>
                            <Card color='grey' isTransparent={true}><Thermometer /></Card>
                            <Card color='grey' isTransparent={true}><Home /></Card>
                        </div>

                        <Button className='records-page__add' icon={<Plus />} isCircle={true} />
                    </div>
                </Card>
                <div className='records-page__list'>
                    {records && records.map((record: Record) => {
                        const Icon = getTypeIcon(record.type.title);

                        return (
                            <Card className='record-card' key={record.date.toString()} color='red' >
                            <Card color='white' isTransparent={true} title={record.type.displayName}>
                                <div className='record-card__icon'>
                                {Icon}
                                </div>
                            </Card>
                            <div className='record-card__content'>
                                <span>{formatDate(record.date)}</span>
                                <br />
                                <span>{record.value} {record.type.unit}</span>
                                <br />
                            </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }
        
    return (<Loading />);
};
