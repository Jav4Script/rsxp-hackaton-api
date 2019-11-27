'use strict';

const { Schema, model } = require('mongoose');

const Author = new Schema({
  name: String,
});

const Category = new Schema({
  name: String,
});

const Attendants = new Schema({
  image: String,
  name: String,
});

const Spots = new Schema({
  total: Number,
  attendants: [Attendants],
});

const Status = new Schema({
  name: String,
});

const Talk = new Schema({
  image: String,
  name: String,
  description: String,
  author: Author,
  date: Date,
  spots: Spots,
  status: Status,
  category: Category,
});

module.exports = model('Talk', Talk);
