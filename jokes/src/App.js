import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Jokes from './Jokes/Jokes';
import Login from './Login/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <header className='nav'>
          <NavLink to='/' className='links'>
            Home
          </NavLink>
          <NavLink to='/login' className='links'>
            Login
          </NavLink>
          <NavLink to='/jokes' className='links'>
            Jokes
          </NavLink>
          <button onClick={this.logout} className='logout-btn'>
            Logout
          </button>
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
