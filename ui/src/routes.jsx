import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <PrivateRoute path="/dashboard/" component={Dashboard} />
    </Switch>
  );
}

export default Routes;
