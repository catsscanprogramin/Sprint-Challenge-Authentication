import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Jokes from './Jokes/Jokes';
import Login from './Login/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <NavLink to='/'>Home</NavLink>
          &nbsp;|&nbsp;
          <NavLink to='/login'>Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to='/jokes'>Jokes</NavLink>
          &nbsp;|&nbsp;
          <button onClick={this.logout}>Logout</button>
        </header>
        <main>
          <Route path='/' exact />
          <Route path='/login' component={Login} />
          <Route path='/jokes' component={Jokes} />
        </main>
      </>
    );
  }
}

export default App;
