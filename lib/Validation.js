function ValidationError(errors = {}) {
  this.name = 'ValidationError';
  this.errors = errors;
}

ValidationError.prototype = Error.prototype;

const validationChar = {
  format: {
    pattern: /[\x20-\x7E]*/,
    message: 'can only contain char from Ox20 to 0x7E'
  }
};

export {ValidationError, validationChar};
