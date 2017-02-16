import validate from 'validate.js';
import {ValidationError, validationChar} from '../Validation';
import {wordPad, numberPad, fillWith} from '../utils.js';

/**
 * IssuerIndicativeArea Class
 * For D0
 *
 * @private
 */
class IssuerIndicativeArea {
  constructor(common, issuer) {
    this.common = common;
    this.data = issuer;
  }

  export() {
    this.validation();

    return [
      ...this.common.export(),
      fillWith('0', 30),
      'D0',
      wordPad(this.data.socialReason, 50),
      numberPad(this.data.issuerCodeLegalCategory, 4)
    ];
  }

  validation() {
    this.common.validation();

    const issuerSchema = {
      socialReason: {
        presence: true,
        length: { maximum: 50 },
        ...validationChar
      },
      issuerCodeLegalCategory: {
        length: { is: 4 },
        ...validationChar
      }
    };

    const invalid = validate(this.data, issuerSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }
}

export default IssuerIndicativeArea;
