import {fillWithPattern} from './utils.js';
import {FixedIncomeProducts, TaxCredit, Fees, IncomeSubjectToIncomeTax} from './amountItems';

/**
 * R2Amount Class
 *
 * R 2 Zone
 */
class R2Amount {
  /**
   * @param  {AmountIndicativeArea}      amountIndicativeArea
   * @param  {TaxCredit}                 taxCredit
   * @param  {Object}                    R213R22 (unimplemented)
   * @param  {Object}                    R226R230 (unimplemented)
   * @param  {Object}                    R231 (unimplemented)
   * @param  {IncomeSubjectToIncomeTax}  incomeSubjectToIncomeTax
   * @param  {FixedIncomeProducts}       fixedIncomeProducts
   * @param  {Object}                    R249R250 (unimplemented)
   * @param  {Fees}                      fees
   * @param  {Object}                    R261R271 (unimplemented)
   */
  constructor(
    amountIndicativeArea,
    taxCredit,
    R213R225,
    R226R230,
    R231,
    incomeSubjectToIncomeTax,
    fixedIncomeProducts,
    R249R250,
    fees,
    R261R271
  ) {
    this.amountIndicativeArea = amountIndicativeArea;
    this.taxCredit = taxCredit;
    this.R213R22 = R213R225;
    this.R226R230 = R226R230;
    this.R231 = R231;
    this.incomeSubjectToIncomeTax = incomeSubjectToIncomeTax;
    this.fixedIncomeProducts = fixedIncomeProducts;
    this.R249R250 = R249R250;
    this.fees = fees;
    this.R261R271 = R261R271;
  }

  export() {
    return [
      ...this.amountIndicativeArea.export(),
      ...((this.taxCredit) ? this.taxCredit.export() : TaxCredit.default()),
      ...fillWithPattern('10N10N10N10N10N10X10N10N10N10N'),
      ...fillWithPattern('10N10N10N'),
      ...fillWithPattern('10N'),
      ...((this.incomeSubjectToIncomeTax) ? this.incomeSubjectToIncomeTax.export() : IncomeSubjectToIncomeTax.default()),
      ...((this.fixedIncomeProducts) ? this.fixedIncomeProducts.export() : FixedIncomeProducts.default()),
      ...fillWithPattern('10N10N'),
      ...((this.fees) ? this.fees.export() : Fees.default()),
      ...fillWithPattern('10N10N19X')
    ];
  }

  validation() {
    this.amountIndicativeArea.validation();

    if (this.taxCredit) {
      this.taxCredit.validation();
    }

    if (this.grossAmountRevenues) {
      this.grossAmountRevenues.validation();
    }

    if (this.incomeSubjectToIncomeTax) {
      this.incomeSubjectToIncomeTax.validation();
    }

    if (this.fixedIncomeProducts) {
      this.fixedIncomeProducts.validation();
    }

    if (this.fees) {
      this.fees.validation();
    }

    return true;
  }
}

export default R2Amount;
