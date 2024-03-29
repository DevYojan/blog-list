const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const testRouter = require('./controllers/test');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected To MongoDB');
  })
  .catch((error) => logger.error('Error connecting to MongoDB: ', error.message));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'development') {
  app.use('/api/testing/reset', testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
