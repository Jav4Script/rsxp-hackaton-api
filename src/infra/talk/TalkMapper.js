'use strict';

const Talk = require('../../domain/talk/Talk');

const Author = require('../../domain/talk/Author');

const Spots = require('../../domain/talk/Spots');

const Attendant = require('../../domain/talk/Attendant');

const Status = require('../../domain/talk/Status');

const Category = require('../../domain/talk/Category');

module.exports = {
  toEntity(data) {
    const {
      _id,
      image,
      name,
      description,
      author,
      date,
      spots,
      status,
      category,
    } = data;

    return new Talk({
      id: _id,
      image,
      name,
      description,
      author: new Author({ id: author._id, name: author.name }),
      date,
      spots: new Spots({
        total: spots.total,
        attendants: spots.attendants.map(
          (attendant) => new Attendant({
              id: attendant._id,
              image: attendant.image,
              name: attendant.name,
            }),
        ),
      }),
      status: new Status({ id: status._id, name: status.name }),
      category: new Category({ id: category._id, name: category.name }),
    });
  },
  toDatabase(survivor) {
    const {
      image,
      description,
      author,
      name,
      date,
      spots,
      status,
      category,
    } = survivor.toJSON();

    return {
      image,
      description,
      author: { name: author.name },
      name,
      date,
      spots: {
        total: spots.total,
        attendants: spots.attendants.map((attendant) => ({
          name: attendant.name,
        })),
      },
      status,
      category,
    };
  },
};
