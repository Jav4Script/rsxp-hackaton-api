'use strict';

const Status = require('http-status');

const { response } = require('../responses');

const GetTalk = require('../../../app/talks/GetTalk');

const talksRepository = require('../../../infra/talk/TalkRepository');

const talkSerializer = require('./TalkSerializer');

const getById = async (context, request) => {
  const getTalk = new GetTalk({ talksRepository });
  const { SUCCESS, ERROR, NOT_FOUND } = getTalk.outputs;

  getTalk
    .on(SUCCESS, (talk) => {
      context.res = response(Status.OK, talkSerializer.serialize(talk));
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

  return getTalk.execute(request.params.id);
};

module.exports = getById;
