import validate from 'validate.js';
import {ValidationError, validationChar} from '../Validation';
import {wordPad, numberPad, fillWith} from '../utils';

/**
 * Address Class
 *
 * @private
 */
class Address {
  constructor(type, address) {
    this.type = type;
    this.data = address;
  }

  export() {
    const common = [
      wordPad(this.data.additionalAddress, 32, ' '),
      numberPad(this.data.streetNumber, 4),
      wordPad(this.data.additionalStreetNumber, 1, ' '),
      ' ',
      wordPad(this.data.streetName, 26, ' '),
      numberPad(this.data.inseeCode, 5),
      ' ',
      wordPad(this.data.city, 26, ' '),
      this.data.zipCode,
      ' ',
      wordPad(this.data.officeDistributor, 26),
    ];

    return (this.type === 1) ? [
      ...common,
      this.data.issuanceDate,
      wordPad(this.data.oldSiret, 14, ' '),
      fillWith(' ', 175)
    ] : [
      ...common,
      ' ',
      wordPad(this.data.legalCategoryCode, 4),
      wordPad(this.data.referencePeriod, 4),
      fillWith(' ', 4)
    ];
  }

  validation() {
    const commonSchema = {
      additionalAddress: {
        length: { maximum: 32},
        ...validationChar
      },
      streetNumber: {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 9999
        }
      },
      additionalStreetNumber: {
        inclusion: ['B', 'T', 'Q', 'C']
      },
      streetName: {
        length: { maximum: 26},
        ...validationChar
      },
      inseeCode: {
        length: { maximum: 5 },
        ...validationChar
      },
      city: {
        length: { maximum: 26 },
        ...validationChar
      },
      zipCode: {
        presence: true,
        length: { is: 5 },
        ...validationChar
      },
      officeDistributor: {
        presence: true,
        length: { maximum: 26 },
        ...validationChar
      }
    };

    const issuerAddressSchema = {
      ...commonSchema,
      issuanceDate: {
        presence: true,
        length: { is: 8 },
        format: {
          pattern: '^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$'
        }
      },
      oldSiret: {
        length: { is: 14 },
        ...validationChar
      }
    };

    const recipientAddressSchema = {
      ...commonSchema,
      legalCategoryCode: {
        length: { is: 4 },
        ...validationChar
      },
      referencePeriod: {
        length: { is: 4 },
        ...validationChar
      }
    };

    const invalid =  validate(this.data, (this.type === 1) ? issuerAddressSchema : recipientAddressSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }
}

export default Address;
