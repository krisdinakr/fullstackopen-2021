const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const testingRouter = require('./controllers/testing');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((err) => logger.error('error coneccting to MongoDB:', err.message));

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

app.use(middleware.errorHandler);

module.exports = app;
