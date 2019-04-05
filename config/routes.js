// ---------------------------DEPENDS------------------------------ //
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('./middleware.js');
const db = require('../database/dbConfig.js');
// ---------------------------EXPORTS------------------------------ //
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};
// ---------------------------FUNCTIONS------------------------------ //
function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;
  if (!creds || !creds.username || !creds.password) {
    res.status(400).json({
      message:
        'Sorry, both username and password are required, I dont make the rules homie.'
    });
  } else {
    db('users')
      .insert(creds)
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({ id: user.id, token });
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }
}

function login(req, res) {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({
          message: 'Invalid authentication. Please try again.'
        });
      }
    })
    .catch(err => res.status(500).json(err.message));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
