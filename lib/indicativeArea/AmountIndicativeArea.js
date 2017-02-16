import validate from 'validate.js';
import {ValidationError, validationChar} from '../Validation';
import {wordPad} from '../utils.js';

/**
 * AmountIndicative Class
 * For R2 / R3 zone
 *
 * @private
 */
class AmountIndicative {
  constructor(common, amountCode, amount = {}) {
    this.common = common;
    this.amountCode = amountCode;
    this.data = amount;
  }

  export() {
    this.validation();

    return [
      ...this.common.export(),
      wordPad(this.data.establishmentCode, 9),
      wordPad(this.data.branchCode, 5),
      wordPad(this.data.accountNumber, 14),
      wordPad(this.data.key, 2),
      this.amountCode,
    ];
  }

  validation() {
    this.common.validation();

    const amountSchema = {
      establishmentCode: {
        length: { maximum: 9 },
        ...validationChar
      },
      branchCode: {
        length: { is: 5 },
        ...validationChar
      },
      accountNumber: {
        length: { maximum: 14 },
        ...validationChar
      },
      key: {
        length: { is: 2 },
        ...validationChar
      }
    };

    const invalid = validate(this.data, amountSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }
}

export default AmountIndicative;
