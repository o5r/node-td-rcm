import validate from 'validate.js';
import {ValidationError} from './Validation';
import {wordPad, numberPad, fillWith} from './utils.js';

/**
 * R1Recipient Class
 *
 * R 1 Zone
 */
class R1Recipient {
  /**
   * @param  {Object} blocks
   * @param  {RecipientIndicativeArea} [blocks.recipientIndicativeArea]
   * @param  {Number} [blocks.recipientType]
   * @param  {Object} [blocks.recipient]
   * @param  {Number} [blocks.recipient.siret]           R 112 SIRET bénéficiaire
   * @param  {String} [blocks.recipient.socialReason]    R 113 Raison social (mandatory for corporate)
   * @param  {String} [blocks.recipient.familyname]      R 114 Nom de famille (mandatory for physical person)
   * @param  {String} [blocks.recipient.firstnames]      R 115 Prénoms (ordre état civil) (mandatory for physical person)
   * @param  {String} [blocks.recipient.name]            R 116 Nom d'usage
   * @param  {Number} [blocks.recipient.sex]             R 118 Code sexe (mandatory for physical person)
   * @param  {Object} [blocks.birth]
   * @param  {Number} [blocks.birth.year]                R 119 Année (format YYYYMMDD)
   * @param  {Number} [blocks.birth.month]               R 120 Mois (format MM)
   * @param  {Number} [blocks.birth.day]                 R 121 Jour (format DD)
   * @param  {String} [blocks.birth.departementCode]     R 122 Code département
   * @param  {String} [blocks.birth.cityCode]            R 123 Code commune
   * @param  {String} [blocks.birth.city]                R 124 Libellé commune
   * @param  {String} [blocks.birth.job]                 R 126 Profession
   * @param  {RecipientAddress} [blocks.recipientAddress]
   */
  constructor(blocks) {
    [
      'recipientIndicativeArea',
      'recipientType',
      'recipient',
      'birth',
      'recipientAddress'
    ].forEach((blockName) => {
      this[blockName] = blocks[blockName]
    });
  }

  export() {
    this.validation();

    return [
      ...this.recipientIndicativeArea.export(),
      numberPad(this.recipient.siret, 14),
      wordPad(this.recipient.socialReason, 50),
      wordPad(this.recipient.familyname, 30),
      wordPad(this.recipient.firstnames, 20),
      wordPad(this.recipient.name, 30),
      fillWith(' ', 20),
      wordPad(this.recipient.sex, 1),

      numberPad(this.birth && this.birth.year, 4),
      numberPad(this.birth && this.birth.month, 2),
      numberPad(this.birth && this.birth.day, 2),
      numberPad(this.birth && this.birth.departementCode, 2),
      numberPad(this.birth && this.birth.cityCode, 3),
      wordPad(this.birth && this.birth.city, 26),
      ' ',
      wordPad(this.birth && this.birth.job, 30),

      ...this.recipientAddress.export()
    ];
  }

  validation() {
    this.recipientIndicativeArea.validation();
    this.recipientAddress.validation();

    const recipientSchema = {
      siret: {
        length: { is: 14 }
      },
      socialReason: {
        presence: (this.recipientType === 1),
        length: { maximum: 50 }
      },
      familyname: {
        presence: (this.recipientType === 2),
        length: { maximum: 30 }
      },
      firstnames: {
        presence: (this.recipientType === 2),
        length: { maximum: 20 }
      },
      name: {
        length: { maximum: 30 }
      },
      sex: {
        presence: (this.recipientType === 2),
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 2
        }
      }
    };

    const birthSchema = {
      year: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1900,
          lessThanOrEqualTo: 2999
        }
      },
      month: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 12
        }
      },
      day: {
        presence: true,
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: 1,
          lessThanOrEqualTo: 31
        }
      },
      departementCode: {
        presence: true,
        length: { is: 2 }
      },
      cityCode: {
        length: { is: 3 }
      },
      city: {
        presence: true,
        length: { maximum: 26 }
      },
      job: {
        length: { maximum: 30 }
      }
    };

    const invalid = validate(this.recipient, recipientSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    }

    if (this.recipientType === 2) {
      const invalid2 = validate(this.birth, birthSchema);
      if (invalid2) {
        throw new ValidationError(invalid2);
      }
    }

    return true;
  }
}

export default R1Recipient;
