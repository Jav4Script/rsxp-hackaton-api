'use strict';

const Status = require('http-status');

const response = (status, body = null, additionalHeaders = {}) => {
  if (body && status !== 204) {
    return {
      body,
      headers: {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      },
      status,
    };
  }

  return { status };
};

const responseError = (error, logger) => {
  logger(error);

  return response(Status.INTERNAL_SERVER_ERROR, {
    type: 'InternalServerError',
    message: 'The server failed to handle this request',
  });
};

module.exports = {
  response,
  responseError,
};
