import React from 'react';
import './Dashboard.css';
import { Switch, Route } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import DashboardMenu from './components/DashboardMenu';
import Extract from './Extract/Extract';
import Transfer from './Transfer/Transfer';
import Deposit from './Deposit/Deposit';
import Withdraw from './Withdraw/Withdraw';
import Contact from './Contact/Contact';

const Dashboard = () => (
  <section id="dashboard">
    <DashboardHeader />
    <DashboardMenu />
    <Switch>
      <Route path="/dashboard/extract" exact component={Extract} />
      <Route path="/dashboard/transfer" exact component={Transfer} />
      <Route path="/dashboard/deposit" exact component={Deposit} />
      <Route path="/dashboard/withdraw" exact component={Withdraw} />
      <Route path="/dashboard/contacts" exact component={Contact} />
    </Switch>
  </section>
);

export default Dashboard;
