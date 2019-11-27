'use strict';

const { Types } = require('mongoose');

const OccupationMapper = require('./OccupationMapper');

const Occupation = require('../mongoose/models/occupations');

const findOccupation = async (id) => {
  const notFound = () => {
    const notFoundError = new Error('NotFoundError');
    notFoundError.details = `Occupation with id ${id} can't be found.`;

    throw notFoundError;
  };

  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    notFound();
  }

  const occupation = await Occupation.findById(id);

  if (!occupation) {
    notFound();
  }

  return occupation;
};

const find = async (...args) => {
  const occupations = await Occupation.find(...args);

  return occupations.map(OccupationMapper.toEntity);
};

const findById = async (id) => {
  const occupation = await findOccupation(id);

  return OccupationMapper.toEntity(occupation);
};

const create = async (occupation) => {
  const { valid, errors } = occupation.validate();
  if (!valid) {
    const error = new Error('ValidationError');
    error.details = errors;

    throw error;
  }

  const newOccupation = await Occupation.create(OccupationMapper.toDatabase(occupation));
  return OccupationMapper.toEntity(newOccupation);
};

module.exports = {
  find,
  findById,
  create,
};
