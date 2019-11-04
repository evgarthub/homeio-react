import * as React from 'react';
import './App.scss';
import recordsService from './api/services/Records';
import { Record } from './api/models';
import { AxiosResponse } from 'axios';

const App = () => {
  const [records, setRecords] = React.useState<Record[]>();

  React.useEffect(() => {
    recordsService.get()
      .then((resp: AxiosResponse<Record[]>) => {
        setRecords(resp.data);
      })
  }, []);

  return (
      <section>
        {records && records.map((record: Record) => (
          <div>
            <span>{record.date}</span>
            <br />
            <span>{record.value}</span>
            <br />
            <span>{record.type.title}</span>
          </div>
        ))}
      </section>
  );
}

export default App;
