import * as React from 'react';
import './App.scss';
import recordsService from './api/services/Records';
import { Record } from './api/models';
import { AxiosResponse } from 'axios';
import { Card } from './ts/components';
import { formatDate, getTypeIcon } from './ts/utils';

const App = () => {
  const [records, setRecords] = React.useState<Record[]>();

  React.useEffect(() => {
    recordsService.get()
      .then((resp: AxiosResponse<Record[]>) => {
        setRecords(resp.data);
        console.log(resp.data)
      })
  }, []);

  

  return (
    <section>
      {records && records.map((record: Record) => {
        const Icon = getTypeIcon(record.type.title);

        return (
          <Card key={record.date.toString()} color='blue' >
            <Icon size={16} />
            <span>{formatDate(record.date)}</span>
            <br />
            <span>{record.value}</span>
            <br />
          </Card>
        );
      })
      }
    </section>
  );
}

export default App;
