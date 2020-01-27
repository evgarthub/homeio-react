import * as React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { NavItem, Navigation } from './ts/components/Navigation';
import { Home, List } from 'react-feather';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecordsPage, Dashboard } from './ts/pages';
import { TitleWithIcon, Clock } from './ts/components';
import { useDispatchOnMount } from './ts/utils/storeHelpers';
import { fetchTypes } from './ts/store/storage/types/thunk';
import { fetchRecords } from './ts/store/storage/records/thunk';
import { fetchTariffs } from './ts/store/storage/tariffs/thunk';

const App = () => {
  const [currentTitle, setCurrentTitle] = React.useState('Dashboard');
  useDispatchOnMount(fetchTypes());
  useDispatchOnMount(fetchRecords());
  useDispatchOnMount(fetchTariffs());

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      url: '/',
      icon: <Home />,
      onComplete: setCurrentTitle,
    },
    {
      title: 'Records',
      url: '/records',
      icon: <List />,
      onComplete: setCurrentTitle,
    }
  ];

  return (
    <section className='layout'>
      <Router>
        <div className='layout__left'>
          <TitleWithIcon className='layout__logo' />
          <Navigation items={navItems} />
        </div>
        <div className='layout__center'>
          <header className='layout__header'>
            <div className='layout__title'>{currentTitle}</div>
            <div className='layout__date'><Clock /></div>
          </header>
          <Switch>
            <Route path='/records' component={RecordsPage} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </section>
  );
}

export default App;
