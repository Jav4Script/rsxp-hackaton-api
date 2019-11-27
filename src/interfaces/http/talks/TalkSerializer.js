'use strict';

module.exports = {
  serialize({
    id,
    image,
    description,
    author,
    name,
    date,
    spots,
    status,
    category,
  }) {
    return {
      id,
      image,
      description,
      author,
      name,
      date,
      spots: {
        available: spots.available(),
        total: spots.total,
        attendants: spots.attendants,
      },
      status,
      category,
    };
  },
};
