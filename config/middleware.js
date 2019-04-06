const jwt = require('jsonwebtoken');

const jwtKey = require('../secrets/keys').jwtKey;

module.exports = {
  authenticate,
  generateToken
};

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '8h',
    jwtid: '55555',
    subject: `${user.id}`
  };
  return jwt.sign(payload, jwtKey, options);
}

function authenticate(req, res, next) {
  const token = req.get('Authorization');
  console.log(token);

  if (token) {
    jwt.verify(token.replace('Bearer ', ''), jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
}
