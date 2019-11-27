'use strict';

const { attributes } = require('structure');

const Author = attributes({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})(class Author {});

module.exports = Author;
