'use strict';

module.exports = {
  serialize({
    id, slug, image, name, description,
  }) {
    return {
      id, slug, image, name, description,
    };
  },
};
