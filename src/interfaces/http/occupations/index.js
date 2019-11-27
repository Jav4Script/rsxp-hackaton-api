'use strict';

const mongo = require('../../../infra/mongoose');

const requesPipeline = require('../requestPipeline');

const list = require('./ListOccupations');
const getById = require('./GetByIdOccupation');
const create = require('./CreateOccupation');

const database = (name) => requesPipeline(mongo.connect, name);

module.exports = {
  list: database(list),
  getById: database(getById),
  create: database(create),
};
