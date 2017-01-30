import validate from 'validate.js';
import ValidationError from '../ValidationError.js';
import {numberPad, fillWithPattern} from '../utils.js';

/**
 * TaxCredit Class
 *
 * Crédit d'impot
 * R209 - R211
 *
 * @private
 */
class TaxCredit {
  /**
   * @param {Object}  taxCredit
   * @param {Number}  [taxCredit.AA]  R209 - 2AB Crédit d’impôt non restituable
   * @param {Number}  [taxCredit.AJ]  R210 - 2BG Crédit d’impôt restituable
   * @param {Number}  [taxCredit.AD]  R211 - 2CK Crédit d’impôt prélèvement restituable
   */
  constructor(taxCredit) {
    this.taxCredit = taxCredit
  }

  export() {
    this.validation();

    return [
      numberPad(this.taxCredit.AA, 10),
      numberPad(this.taxCredit.AJ, 10),
      numberPad(this.taxCredit.AD, 10)
    ];
  }

  validation() {
    const taxCreditSchema = {
      AA: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 9999999999
        }
      },
      AJ: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 9999999999
        }
      },
      AD: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 9999999999
        }
      }
    };

    const invalid = validate(this.taxCredit, taxCreditSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }

  static default() {
    return fillWithPattern('10N10N10N');
  }
}

export default TaxCredit;
