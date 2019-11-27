'use strict';

const { attributes } = require('structure');

const Category = attributes({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})(class Category {});

module.exports = Category;
