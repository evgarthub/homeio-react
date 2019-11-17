import * as React from 'react';
import recordsService from '../../../api/services/Records';
import { Record } from '../../../api/models';
import { AxiosResponse } from 'axios';
import { Card } from '../../components';
import { formatDate, getTypeIcon } from '../../utils';
import './styles.scss';

export const RecordsPage = () => {
    const [records, setRecords] = React.useState<Record[]>();

    React.useEffect(() => {
        recordsService.get()
            .then((resp: AxiosResponse<Record[]>) => {
            setRecords(resp.data);
            console.log(resp.data)
            })
    }, []);
    
    return (
        <div className='records-page'>
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
    )
};
