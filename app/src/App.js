import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import LoginPage from './components/login-page/LoginPage'; 
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import './App.css';

class App extends React.Component {
  render() {
    return(
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path='/' exact={true} component={MainPage} />
            <Route path='/login' exact={true} component={LoginPage} />
            <Route path='/home' exact={true} component={HomePage} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}
export default App;
