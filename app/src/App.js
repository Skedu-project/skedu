import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/login-page/LoginPage'; 
import HomePageHeader from './components/HomePageHeader';
import './App.css';

class App extends React.Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path='/' exact={true} component={LoginPage} />
          <Route path='/home' exact={true} component={HomePageHeader} />
        </Switch>
      </Router>
    );
  }
}
export default App;
