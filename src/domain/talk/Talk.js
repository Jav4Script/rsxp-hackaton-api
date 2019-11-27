'use strict';

const { attributes } = require('structure');

const Author = require('./Author');

const Status = require('./Status');

const Category = require('./Category');

const Spots = require('./Spots');

const Talk = attributes({
  id: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Author,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  spots: {
    type: Spots,
    required: true,
  },
  status: {
    type: Status,
    required: true,
  },
  category: {
    type: Category,
    required: true,
  },
})(class Talk {});

module.exports = Talk;
