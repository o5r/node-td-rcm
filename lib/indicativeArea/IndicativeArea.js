import validate from 'validate.js';
import ValidationError from '../ValidationError.js';
import {wordPad, numberPad, fillWith} from '../utils.js';

/**
 * IndicativeArea Class
 *
 * @private
 */
class IndicativeArea {
  constructor(type, data) {
    this.type = type;
    this.data = data
  }

  export() {
    this.validation();

    const common = [
      this.data.year,
      this.data.siret,
      this.data.type,
    ];

    return (this.type === 1) ?
      [
        ...common,
        fillWith('0', 30),
        'D0',
        wordPad(this.data.socialReason, 50),
        numberPad(this.data.issuerCodeLegalCategory, 4)
      ]
      : (this.type === 2) ?
        [
          ...common,
          wordPad(this.data.establishmentCode, 9),
          wordPad(this.data.branchCode, 5),
          wordPad(this.data.accountNumber, 14),
          wordPad(this.data.key, 2),
          'R1',
          wordPad(this.data.accountNature, 1),
          wordPad(this.data.accountType, 1),
          this.data.recipientCode
        ]
      :
        [
          ...common,
          wordPad(this.data.establishmentCode, 9),
          wordPad(this.data.branchCode, 5),
          wordPad(this.data.accountNumber, 14),
          wordPad(this.data.key, 2),
          'R2',
        ];
  }

  validation() {
    const commonSchema = {
      year: {
        presence: true,
        length: { is: 4 }
      },
      siret: {
        presence: true,
        length: { is: 14 }
      },
      type: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 2
        }
      }
    };

    const issuerSchema = {
      ...commonSchema,
      socialReason: {
        presence: true,
        length: { maximum: 50 }
      },
      issuerCodeLegalCategory: {
        length: { is: 4 }
      }
    };

    const amountSchema = {
      establishmentCode: {
        length: { is: 9 }
      },
      branchCode: {
        length: { is: 5 }
      },
      accountNumber: {
        length: { is: 14 }
      },
      key: {
        length: { is: 2 }
      }
    };

    const recipientSchema = {
      ...commonSchema,
      ...amountSchema,
      accountNature: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 3
        }
      },
      accountType: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 6
        }
      },
      recipientCode: {
        presence: true,
        inclusion: ['B', 'T']
      }
    };

    const invalid = validate(this.data, (this.type === 1) ? issuerSchema : (this.type === 2) ? recipientSchema : amountSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }
}

export default IndicativeArea;
