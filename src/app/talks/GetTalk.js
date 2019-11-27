'use strict';

const Operation = require('../Operation');

class GetTalk extends Operation {
  constructor({ talksRepository }) {
    super();
    this.talksRepository = talksRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const talks = await this.talksRepository.findById(id);
      return this.emit(SUCCESS, talks);
    } catch (error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, {
          type: error.message,
          details: error.details,
        });
      }
      return this.emit(ERROR, error);
    }
  }
}

GetTalk.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetTalk;
