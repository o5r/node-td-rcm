import validate from 'validate.js';
import ValidationError from '../ValidationError.js';
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
        length: { maximum: 9 }
      },
      branchCode: {
        length: { is: 5 }
      },
      accountNumber: {
        length: { maximum: 14 }
      },
      key: {
        length: { is: 2 }
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
