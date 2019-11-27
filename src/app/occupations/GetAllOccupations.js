'use strict';

const Operation = require('../Operation');

class GetAllOccupations extends Operation {
  constructor({ occupationsRepository }) {
    super();
    this.occupationsRepository = occupationsRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const occupations = await this.occupationsRepository.find();
      this.emit(SUCCESS, occupations);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllOccupations.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllOccupations;
