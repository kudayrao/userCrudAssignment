import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserList from './components/UserList'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={UserList} />
        <Route exact path='/create' component={CreateUser} />
        <Route exact path='/update/:id' component={UpdateUser} />
      </Switch>
    </Router>
  );
}