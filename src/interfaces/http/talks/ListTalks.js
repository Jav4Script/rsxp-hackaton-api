'use strict';

const Status = require('http-status');

const { response } = require('../responses');

const GetAllTalks = require('../../../app/talks/GetAllTalks');

const talksRepository = require('../../../infra/talk/TalkRepository');

const talkSerializer = require('./TalkSerializer');

const list = async (context) => {
  const getAllTalks = new GetAllTalks({ talksRepository });
  const { SUCCESS, ERROR } = getAllTalks.outputs;

  getAllTalks
    .on(SUCCESS, (talks) => {
      context.res = response(Status.OK, talks.map(talkSerializer.serialize));
    })
    .on(ERROR, (error) => {
      throw error;
    });

  return getAllTalks.execute();
};

module.exports = list;
