'use strict';

const Operation = require('../Operation');

class GetOccupation extends Operation {
  constructor({ occupationsRepository }) {
    super();
    this.occupationsRepository = occupationsRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      const occupations = await this.occupationsRepository.findById(id);
      return this.emit(SUCCESS, occupations);
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

GetOccupation.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetOccupation;
