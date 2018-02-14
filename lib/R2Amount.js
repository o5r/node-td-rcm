import {fillWithPattern} from './utils.js';
import {FixedIncomeProducts, CrowdfundingProducts, TaxCredit, Fees, IncomeSubjectToIncomeTax} from './amountItems';

/**
 * R2Amount Class
 *
 * R 2 Zone
 */
class R2Amount {
  /**
   * @param  {Object}
   * @param  {AmountIndicativeArea}     [blocks.amountIndicativeArea]
   * @param  {TaxCredit}                [blocks.taxCredit]
   * @param  {Object}                   [blocks.R213R22] (unimplemented)
   * @param  {Object}                   [blocks.R226R230] (unimplemented)
   * @param  {Object}                   [blocks.R231] (unimplemented)
   * @param  {IncomeSubjectToIncomeTax} [blocks.incomeSubjectToIncomeTax]
   * @param  {FixedIncomeProducts}      [blocks.fixedIncomeProducts]
   * @param  {CrowdfundingProducts}     [blocks.crowdfundingProducts]
   * @param  {Object}                   [blocks.R249R250] (unimplemented)
   * @param  {Fees}                     [blocks.fees]
   * @param  {Object}                   [blocks.R261R271] (unimplemented)
   */
  constructor(blocks) {
    [
      'amountIndicativeArea',
      'taxCredit',
      'R213R22',
      'R226R230',
      'R231',
      'incomeSubjectToIncomeTax',
      'fixedIncomeProducts',
      'crowdfundingProducts',
      'R249R250',
      'fees',
      'R261R271'
    ].forEach((blockName) => {
      this[blockName] = blocks[blockName]
    });
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
      ...((this.crowdfundingProducts) ? this.crowdfundingProducts.export() : CrowdfundingProducts.default()),
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

    if (this.crowdfundingProducts) {
      this.crowdfundingProducts.validation();
    }

    if (this.fees) {
      this.fees.validation();
    }

    return true;
  }
}

export default R2Amount;
