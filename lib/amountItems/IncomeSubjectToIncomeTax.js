import validate from 'validate.js';
import {ValidationError} from '../Validation';
import {numberPad, fillWithPattern} from '../utils.js';

/**
 * IncomeSubjectToIncomeTax Class
 *
 * Revenus soumis a l’ir et pour lesquels les prélèvements sociaux ont dejà été acquittés
 * R232 - R234
 *
 * @private
 */
class IncomeSubjectToIncomeTax {
  /**
   * @param {Object}  incomeSubjectToIncomeTax
   * @param {Number}  [incomeSubjectToIncomeTax.BS]  R232 - 2CG Produits de PEP, produits de bons ou contrats de capitalisation et des placements de même nature, produits soumis à cotisations RSI (sans CSG déductible)
   * @param {Number}  [incomeSubjectToIncomeTax.DQ]  R233 - 2CG Répartitions de FCPR et distributions de SCR (sans CSG déductible)
   * @param {Number}  [incomeSubjectToIncomeTax.BU]  R234 - 2BH Revenus déjà soumis aux prélèvements sociaux avec CSG déductible
   */
  constructor(incomeSubjectToIncomeTax) {
    this.incomeSubjectToIncomeTax = incomeSubjectToIncomeTax
  }

  export() {
    this.validation();

    return [
      numberPad(this.incomeSubjectToIncomeTax.BS, 10),
      numberPad(this.incomeSubjectToIncomeTax.DQ, 10),
      numberPad(this.incomeSubjectToIncomeTax.BU, 10)
    ];
  }

  validation() {
    const incomeSubjectToIncomeTaxSchema = {
      BS: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 0,
          lessThanOrEqualTo: 9999999999
        }
      },
      DQ: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 0,
          lessThanOrEqualTo: 9999999999
        }
      },
      BU: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 0,
          lessThanOrEqualTo: 9999999999
        }
      }
    };

    const invalid = validate(this.incomeSubjectToIncomeTax, incomeSubjectToIncomeTaxSchema);
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

export default IncomeSubjectToIncomeTax;
