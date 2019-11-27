'use strict';

const Status = require('http-status');

const { response } = require('../responses');

const CreateOccupation = require('../../../app/occupations/CreateOccupation');

const occupationsRepository = require('../../../infra/occupation/OccupationRepository');

const occupationSerializer = require('./OccupationSerializer');

const create = async (context, request) => {
  const createOccupation = new CreateOccupation({ occupationsRepository });
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createOccupation.outputs;

  createOccupation
    .on(SUCCESS, (occupation) => {
      context.res = response(
        Status.CREATED,
        occupationSerializer.serialize(occupation),
      );
    })
    .on(VALIDATION_ERROR, (error) => {
      context.res = response(Status.BAD_REQUEST, {
        type: 'ValidationError',
        details: error.details,
      });
    })
    .on(ERROR, (error) => {
      throw error;
    });


  return createOccupation.execute(request.body);
};

module.exports = create;
