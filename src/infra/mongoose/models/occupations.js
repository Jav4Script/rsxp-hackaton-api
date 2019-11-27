'use strict';

const { Schema, model } = require('mongoose');

const Occupation = new Schema({
  slug: String,
  image: String,
  name: String,
  description: String,
});

module.exports = model('Occupation', Occupation);
