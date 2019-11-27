'use strict';

const { responseError } = require('./responses');

module.exports = (...functions) => async (context, ...args) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const f of functions) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await f(context, ...args);
    } catch (error) {
      context.res = responseError(error, context.log);
    }

    if (context.res && !(context.res.status instanceof Function)) {
      break;
    }
  }
};
