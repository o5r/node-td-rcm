function ValidationError(errors = {}) {
  this.name = 'ValidationError';
  this.errors = errors;
}

ValidationError.prototype = Error.prototype;

export default ValidationError;
