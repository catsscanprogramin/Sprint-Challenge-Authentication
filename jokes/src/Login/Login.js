import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    username: 'test2',
    password: 'test2'
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className='login-form'>
          <h1 className='login-header'>Login</h1>
          <div>
            <label htmlFor='username' />
            <input
              value={this.state.username}
              onChange={this.handleInputChange}
              id='username'
              type='text'
              className='login-input'
            />
          </div>
          <div>
            <label htmlFor='password' />
            <input
              value={this.state.password}
              onChange={this.handleInputChange}
              id='password'
              type='password'
              className='login-input'
            />
          </div>
          <div>
            <button type='submit' className='login-btn'>
              Login
            </button>
          </div>
        </form>
      </>
    );
  }

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = 'http://localhost:3300/api/login';
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log('LOGIN RESPONSE', res);
        localStorage.setItem('token', res.data.token);
      })
      .catch(error => {
        console.error('LOGIN ERROR', error);
      });
  };

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
}

export default Login;
