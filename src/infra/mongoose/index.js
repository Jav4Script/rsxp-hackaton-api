'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

const mongoURL = process.env.MONGODB_URL
  || 'mongodb://admin:admin123@ds044577.mlab.com:44577/matsedb';

const connect = () => {
  if (mongoose.connection.readyState === 1) return Promise.resolve(true);

  return mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const disconnect = () => mongoose.connection.close();
const truncate = () => mongoose.connection.db.dropDatabase();

module.exports = { connect, disconnect, truncate };
