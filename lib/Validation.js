function ValidationError(errors = {}) {
  this.name = 'ValidationError';
  this.errors = errors;
}

ValidationError.prototype = Error.prototype;

// Updated DGFIP specs: characters in 0x20-0x7E range are accepted in their accented versions
// This includes common French accented characters in Latin-1 Supplement block (U+00C0-U+00FF)
// Examples: À, Á, Â, Ã, Ä, Å, Ç, È, É, Ê, Ë, à, á, â, ã, ä, å, ç, è, é, ê, ë, etc.
const validationChar = {
  format: {
    pattern: /^[\x20-\x7E\u00C0-\u00FF]*$/,
    message: 'can only contain ASCII characters (0x20-0x7E) and their accented versions (Latin-1 Supplement)'
  }
};

export {ValidationError, validationChar};
