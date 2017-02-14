import validate from 'validate.js';
import ValidationError from '../ValidationError.js';
import {wordPad} from '../utils.js';

/**
 * RecipientIndicativeArea Class
 * For R1
 *
 * @private
 */
class RecipientIndicativeArea {
  constructor(common, recipient) {
    this.common = common;
    this.data = recipient;
  }

  export() {
    this.validation();

    return [
      ...this.common.export(),
      wordPad(this.data.establishmentCode, 9),
      wordPad(this.data.branchCode, 5),
      wordPad(this.data.accountNumber, 14),
      wordPad(this.data.key, 2),
      'R1',
      wordPad(this.data.accountNature, 1),
      wordPad(this.data.accountType, 1),
      this.data.recipientCode
    ];
  }

  validation() {
    this.common.validation();

    const recipientSchema = {
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

    const invalid = validate(this.data, recipientSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }
}

export default RecipientIndicativeArea;
