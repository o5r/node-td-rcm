import validate from 'validate.js';
import ValidationError from '../ValidationError.js';
import {numberPad, fillWithPattern} from '../utils.js';

/**
 * Fees Class
 *
 * Frais
 * R251
 *
 * @private
 */
class Fees {
  /**
   * @param {Number}  fees  R251 - 2CA Montant des frais
   */
  constructor(fees) {
    this.fees = fees
  }

  export() {
    this.validation();

    return [
      numberPad(this.fees, 10)
    ];
  }

  validation() {
    const feesSchema = {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 9999999999
      }
    };

    const invalid = validate({fees: this.fees }, {fees: feesSchema });

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }

  static default() {
    return fillWithPattern('10N');
  }
}

export default Fees;
