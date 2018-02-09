import validate from 'validate.js';
import {ValidationError} from '../Validation';
import {numberPad, fillWith, fillWithPattern} from '../utils.js';

/**
 * FixedIncomeProducts Class
 *
 * Produits de placement à revenu fixe
 * R237 - R238
 *
 * Produits des minibons et des prêts, financement participatif
 * R239 - R240
 *
 * @private
 */
class FixedIncomeProducts {
  /**
   * @param {Object}  fixedIncomProducts
   * @param {Number}  [fixedIncomProducts.AR]  R237 - 2TR Produits ou gains (PRODUITS DE PLACEMENT A REVENU FIXE)
   * @param {Number}  [fixedIncomProducts.AS]  R238 - Pertes
   * @param {Number}  [fixedIncomProducts.KR]  R239 - 2TT Gains (PRODUITS DES MINIBONS ET DES PRÊTS DANS LE CADRE DU FINANCEMENT PARTICIPATIF)
   * @param {Number}  [fixedIncomProducts.KS]  R240 - 2TU Pertes
   */
  constructor(fixedIncomProducts) {
    this.fixedIncomProducts = fixedIncomProducts
  }

  /**
   * Will write in a row AS+AS or KR+KS or let it empty
   * as user need to be informed there are no losses
   * @return {[string]}
   */
  export() {
    this.validation();
    const fill_ARAS_fields = this.fixedIncomProducts.AR || this.fixedIncomProducts.AS;
    const fill_KRKS_fields = this.fixedIncomProducts.KR || this.fixedIncomProducts.KS;

    const AR = fill_ARAS_fields ? numberPad(this.fixedIncomProducts.AR, 10) : fillWith(' ', 10);
    const AS = fill_ARAS_fields ? numberPad(this.fixedIncomProducts.AS, 10) : fillWith(' ', 10);
    const KR = fill_KRKS_fields ? numberPad(this.fixedIncomProducts.KR, 10) : fillWith(' ', 10);
    const KS = fill_KRKS_fields ? numberPad(this.fixedIncomProducts.KS, 10) : fillWith(' ', 10);
    const reserve = fillWith(' ', 70);

    return [AR, AS, KR, KS, reserve];
  }

  validation() {
    const basicFieldsNumberCHeck = {
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 9999999999
      }
    };
    const fixedIncomProductsSchema = {
      AR: basicFieldsNumberCHeck,
      AS: basicFieldsNumberCHeck,
      KR: basicFieldsNumberCHeck,
      KS: basicFieldsNumberCHeck
    };

    const invalid = validate(this.fixedIncomProducts, fixedIncomProductsSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }

  static default() {
    return fillWithPattern('10N10N90X');
  }
}

export default FixedIncomeProducts;
