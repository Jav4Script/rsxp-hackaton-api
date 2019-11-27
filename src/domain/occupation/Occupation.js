'use strict';

const { attributes } = require('structure');

const Occupation = attributes({
  id: {
    type: String,
  },
  slug: {
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
  description: {
    type: String,
    required: true,
  },
})(class Occupation {});

module.exports = Occupation;
