'use strict';

const Occupation = require('../../domain/occupation/Occupation');

module.exports = {
  toEntity(data) {
    const {
      _id, slug, image, name, description,
    } = data;

    return new Occupation({
      id: _id, slug, image, name, description,
    });
  },
  toDatabase(survivor) {
    const {
      slug, image, name, description,
    } = survivor.toJSON();

    return {
      slug, image, name, description,
    };
  },
};
