'use strict';

const { attributes } = require('structure');

const Status = attributes({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})(class Status {});

module.exports = Status;
