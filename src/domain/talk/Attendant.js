'use strict';

const { attributes } = require('structure');

const Attendant = attributes({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})(class Attendant {});

module.exports = Attendant;
