'use strict';

const Status = require('http-status');

const { response } = require('../responses');

const GetOccupation = require('../../../app/occupations/GetOccupation');

const occupationsRepository = require('../../../infra/occupation/OccupationRepository');

const occupationSerializer = require('./OccupationSerializer');

const getById = async (context, request) => {
  const getOccupation = new GetOccupation({ occupationsRepository });
  const { SUCCESS, ERROR, NOT_FOUND } = getOccupation.outputs;

  getOccupation
    .on(SUCCESS, (occupation) => {
      context.res = response(
        Status.OK,
        occupationSerializer.serialize(occupation),
      );
    })
    .on(NOT_FOUND, (error) => {
      context.res = response(Status.NOT_FOUND, {
        type: 'NotFoundError',
        details: error.details,
      });
    })
    .on(ERROR, (error) => {
      throw error;
    });

  return getOccupation.execute(request.params.id);
};

module.exports = getById;
