'use strict';

const Operation = require('../Operation');

class GetAllTalks extends Operation {
  constructor({ talksRepository }) {
    super();
    this.talksRepository = talksRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const talks = await this.talksRepository.find();
      this.emit(SUCCESS, talks);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllTalks.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllTalks;
