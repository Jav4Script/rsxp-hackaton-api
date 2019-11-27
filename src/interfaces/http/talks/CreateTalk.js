'use strict';

const Status = require('http-status');

const { response } = require('../responses');

const CreateTalk = require('../../../app/talks/CreateTalk');

const talksRepository = require('../../../infra/talk/TalkRepository');

const talkSerializer = require('./TalkSerializer');

const create = async (context, request) => {
  const createTalk = new CreateTalk({ talksRepository });
  const { SUCCESS, ERROR, VALIDATION_ERROR } = createTalk.outputs;

  createTalk
    .on(SUCCESS, (talk) => {
      context.res = response(Status.CREATED, talkSerializer.serialize(talk));
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

  return createTalk.execute(request.body);
};

module.exports = create;
