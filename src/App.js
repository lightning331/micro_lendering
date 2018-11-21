import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/LoginRegister/SignUp/SignUp';
import OTPCode from './components/LoginRegister/SignUp/OTPCodeVerify';
import MakePassword from './components/LoginRegister/SignUp/MakePassword';
import Login from './components/LoginRegister/Login/Login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Register}/>
          <Route path="/otpcode" component={OTPCode}/>
          <Route path="/createpassword" component={MakePassword}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
