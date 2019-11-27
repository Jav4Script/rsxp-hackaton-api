'use strict';

const Status = require('http-status');

const { response } = require('../responses');

const GetAllOccupations = require('../../../app/occupations/GetAllOccupations');

const occupationsRepository = require('../../../infra/occupation/OccupationRepository');

const occupationSerializer = require('./OccupationSerializer');

const list = async (context) => {
  const getAllOccupations = new GetAllOccupations({ occupationsRepository });
  const { SUCCESS, ERROR } = getAllOccupations.outputs;

  getAllOccupations
    .on(SUCCESS, (occupations) => {
      context.res = response(
        Status.OK,
        occupations.map(occupationSerializer.serialize),
      );
    })
    .on(ERROR, (error) => {
      throw error;
    });

  return getAllOccupations.execute();
};

module.exports = list;
