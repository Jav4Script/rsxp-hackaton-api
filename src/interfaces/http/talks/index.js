'use strict';

const mongo = require('../../../infra/mongoose');

const requesPipeline = require('../requestPipeline');

const list = require('./ListTalks');
const getById = require('./GetByIdTalk');
const create = require('./CreateTalk');

const database = (name) => requesPipeline(mongo.connect, name);

module.exports = {
  list: database(list),
  getById: database(getById),
  create: database(create),
};
