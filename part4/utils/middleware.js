const jwt = require('jsonwebtoken');
const logger = require('./logger');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  switch (err.name) {
    case 'CastError':
      return res.status(400).json({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: err.message });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' });
    default:
      return next(err);
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (!authorization) return res.status(401).json({ error: 'token missing' });

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    req.token = token;
    return next();
  }
  return next();
};

const userExtractor = (req, res, next) => {
  const { token } = req;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken) return res.status(401).json({ error: 'token invalid' });
  req.user = decodedToken;

  return next();
};

module.exports = {
  unknownEndpoint, errorHandler, tokenExtractor, userExtractor,
};
