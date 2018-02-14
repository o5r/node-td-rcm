import validate from 'validate.js';
import {ValidationError} from '../Validation';
import {numberPad, fillWith, fillWithPattern} from '../utils.js';

/**
 * CrowdfundingProducts Class
 *
 * Produits des minibons et des prêts, financement participatif
 * R239 - R240
 *
 * @private
 */
class CrowdfundingProducts {
  /**
   * @param {Object}  crowdfundingProducts
   * @param {Number}  [crowdfundingProducts.KR]  R239 - 2TT Gains (PRODUITS DES MINIBONS ET DES PRÊTS DANS LE CADRE DU FINANCEMENT PARTICIPATIF)
   * @param {Number}  [crowdfundingProducts.KS]  R240 - 2TU Pertes
   */
  constructor(crowdfundingProducts) {
    this.crowdfundingProducts = crowdfundingProducts;
  }

  /**
   * Will write KR/KS or set it to 0
   * @return {string[]}
   */
  export() {
    this.validation();

    return [
      numberPad(this.crowdfundingProducts.KR, 10),
      numberPad(this.crowdfundingProducts.KS, 10),
      fillWith(' ', 70)
    ];
  }

  validation() {
    const basicFieldsNumberCheck = {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 9999999999
      }
    };
    const crowdfundingProductsSchema = {
      KR: basicFieldsNumberCheck,
      KS: basicFieldsNumberCheck
    };

    const invalid = validate(this.crowdfundingProducts, crowdfundingProductsSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }

  static default() {
    return fillWithPattern('10N10N70X');
  }
}

export default CrowdfundingProducts;
