import "./App.scss";
import { NavItem, Navigation } from "./components/Navigation";
import { Home, List } from "react-feather";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecordsPage, Dashboard } from "./pages";
import { TitleWithIcon, Clock } from "./components";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "./queries/queryClient";

const App = () => {
  const [currentTitle, setCurrentTitle] = useState("Dashboard");

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: <Home />,
      onComplete: setCurrentTitle,
    },
    {
      title: "Records",
      url: "/records",
      icon: <List />,
      onComplete: setCurrentTitle,
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <section className="layout">
        <Router>
          <div className="layout__left">
            <TitleWithIcon className="layout__logo" />
            <Navigation items={navItems} />
          </div>
          <div className="layout__center">
            <header className="layout__header">
              <div className="layout__title">{currentTitle}</div>
              <div className="layout__date">
                <Clock />
              </div>
            </header>
            <Switch>
              <Route path="/records" component={RecordsPage} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </section>
    </QueryClientProvider>
  );
};

export default App;
