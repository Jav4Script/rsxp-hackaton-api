'use strict';

const { Types } = require('mongoose');

const TalkMapper = require('./TalkMapper');

const Talk = require('../mongoose/models/talks');

const findTalk = async (id) => {
  const notFound = () => {
    const notFoundError = new Error('NotFoundError');
    notFoundError.details = `Talk with id ${id} can't be found.`;

    throw notFoundError;
  };

  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    notFound();
  }

  const talk = await Talk.findById(id);

  if (!talk) {
    notFound();
  }

  return talk;
};

const find = async (...args) => {
  const talks = await Talk.find(...args);

  return talks.map(TalkMapper.toEntity);
};

const findById = async (id) => {
  const talk = await findTalk(id);

  return TalkMapper.toEntity(talk);
};

const create = async (talk) => {
  const { valid, errors } = talk.validate();
  if (!valid) {
    const error = new Error('ValidationError');
    error.details = errors;

    throw error;
  }

  const newTalk = await Talk.create(TalkMapper.toDatabase(talk));
  return TalkMapper.toEntity(newTalk);
};

module.exports = {
  find,
  findById,
  create,
};
