import validate from 'validate.js';
import {ValidationError} from '../Validation';
import {numberPad, fillWithPattern} from '../utils.js';

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
   * @param {Object}  fixedIncomeProducts
   * @param {Number}  [fixedIncomeProducts.AR]  R237 - 2TR Produits ou gains
   * @param {Number}  [fixedIncomeProducts.AS]  R238 Pertes
   */
  constructor(fixedIncomeProducts) {
    this.fixedIncomeProducts = fixedIncomeProducts;
  }

  export() {
    this.validation();

    return [
      numberPad(this.fixedIncomeProducts.AR, 10),
      numberPad(this.fixedIncomeProducts.AS, 10)
    ];
  }

  validation() {
    const fixedIncomeProductsSchema = {
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

    const invalid = validate(this.fixedIncomeProducts, fixedIncomeProductsSchema);

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
