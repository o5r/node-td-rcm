import validate from 'validate.js';
import {ValidationError} from '../Validation';
import {numberPad, fillWith, fillWithPattern} from '../utils.js';

/**
 * FixedIncomeProducts Class
 *
 * Produits de placement à revenu fixe
 * R237 - R238
 *
 * @private
 */
class FixedIncomeProducts {
  /**
   * @param {Object}  fixedIncomProducts
   * @param {Number}  [fixedIncomProducts.AR]  R237 - 2TR Produits ou gains
   * @param {Number}  [fixedIncomProducts.AS]  R238 Pertes
   */
  constructor(fixedIncomProducts) {
    this.fixedIncomProducts = fixedIncomProducts
  }

  export() {
    this.validation();

    return [
      numberPad(this.fixedIncomProducts.AR, 10),
      numberPad(this.fixedIncomProducts.AS, 10)
    ];
  }

  validation() {
    const fixedIncomProductsSchema = {
      AR: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 0,
          lessThanOrEqualTo: 9999999999
        }
      },
      AS: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 0,
          lessThanOrEqualTo: 9999999999
        }
      }
    };

    const invalid = validate(this.fixedIncomProducts, fixedIncomProductsSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }

  static default() {
    return fillWithPattern('10N10N');
  }
}

export default FixedIncomeProducts;
