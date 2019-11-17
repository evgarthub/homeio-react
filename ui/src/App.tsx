import * as React from 'react';
import './App.scss';
import { NavItem, Navigation } from './ts/components/Navigation';
import { Home, List } from 'react-feather';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecordsPage } from './ts/pages';
import { TitleWithIcon } from './ts/components';

const App = () => {
  const [currentTitle, setCurrentTitle] = React.useState('Dashboard');

  const today = new Date().toLocaleString();
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
            <div className='layout__date'>{today}</div>
          </header>
          <Switch>
            <Route path='/records' component={RecordsPage} />
            
          </Switch>
        </div>
      </Router>
    </section>
  );
}

export default App;
