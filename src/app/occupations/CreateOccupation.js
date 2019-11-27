'use strict';

const Operation = require('../Operation');

const Occupation = require('../../domain/occupation/Occupation');

class CreateOccupation extends Operation {
  constructor({ occupationsRepository }) {
    super();
    this.occupationsRepository = occupationsRepository;
  }

  async execute(occupationData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const occupation = new Occupation(occupationData);

    try {
      const newOccupation = await this.occupationsRepository.create(occupation);
      return this.emit(SUCCESS, newOccupation);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

CreateOccupation.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateOccupation;
