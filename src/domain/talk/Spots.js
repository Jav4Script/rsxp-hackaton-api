'use strict';

const { attributes } = require('structure');

const Attendant = require('./Attendant');

const Spot = attributes({
  total: {
    type: Number,
    required: true,
  },
  attendants: {
    type: Array,
    itemType: Attendant,
    required: true,
  },
})(
  class Spot {
    available() {
      return this.total - this.attendants.length;
    }
  },
);

module.exports = Spot;
