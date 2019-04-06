import React from 'react';
import axios from 'axios';

import requiresAuth from '../auth/requiresAuth';

import './Jokes.css';

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <h2 className='joke-title'>Dad Jokes of the Year</h2>
        <div className='jokes-container'>
          {this.state.jokes.map(joke => (
            <p key={joke.id} className='joke'>
              {joke.joke}
            </p>
          ))}
        </div>
        <img
          src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/c6855658140225.59f0d249d351b.jpg'
          alt='dad-img'
          className='dad-img'
        />
      </>
    );
  }

  componentDidMount() {
    const endpoint = `/jokes`;
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(error => {
        console.error('USERS ERROR', error);
      });
  }
}

export default requiresAuth(Jokes);
