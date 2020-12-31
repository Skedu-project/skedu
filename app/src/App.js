import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/CreateAccount';
import LogInAccount from './components/login-account/LogInAccount';
import HomePage from './components/HomePage';

class App extends React.Component {
  render() {
    return(
      <Router>
        <Switch>
          {/* <Route path='/' exact={true} component={CreateAccount} /> */}
          <Route path='/' exact={true} component={LogInAccount} />
          <Route path='/home' exact={true} component={HomePage} />
        </Switch>
      </Router>
    );
  }
}
export default App;
