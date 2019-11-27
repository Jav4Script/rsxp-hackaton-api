'use strict';

const Operation = require('../Operation');

const Talk = require('../../domain/talk/Talk');

class CreateTalk extends Operation {
  constructor({ talksRepository }) {
    super();
    this.talksRepository = talksRepository;
  }

  async execute(talkData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const talk = new Talk(talkData);

    try {
      const newTalk = await this.talksRepository.create(talk);
      return this.emit(SUCCESS, newTalk);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateTalk.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateTalk;
