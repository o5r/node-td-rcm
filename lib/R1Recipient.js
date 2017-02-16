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
   * @param  {RecipientIndicativeArea}  recipientIndicativeArea
   * @param  {Number} recipientType
   * @param  {Object} recipient
   * @param  {Number} [recipient.siret]           R 112 SIRET bénéficiaire
   * @param  {String} [recipient.socialReason]    R 113 Raison social (mandatory for corporate)
   * @param  {String} [recipient.familyname]      R 114 Nom de famille (mandatory for physical person)
   * @param  {String} [recipient.firstnames]      R 115 Prénoms (ordre état civil) (mandatory for physical person)
   * @param  {String} [recipient.name]            R 116 Nom d'usage
   * @param  {Number} [recipient.sex]             R 118 Code sexe (mandatory for physical person)
   * @param  {Object} birth
   * @param  {Number} birth.year                  R 119 Année (format YYYYMMDD)
   * @param  {Number} birth.month                 R 120 Mois (format MM)
   * @param  {Number} birth.day                   R 121 Jour (format DD)
   * @param  {String} birth.departementCode      R 122 Code département
   * @param  {String} [birth.cityCode]            R 123 Code commune
   * @param  {String} birth.city                  R 124 Libellé commune
   * @param  {String} [birth.job]                 R 126 Profession
   * @param  {recipientAddress} recipientAddress
   */
  constructor(recipientIndicativeArea, recipientType, recipient, birth, recipientAddress) {
    this.recipientIndicativeArea = recipientIndicativeArea;
    this.recipientType = recipientType;
    this.recipient = recipient;
    this.birth = birth;
    this.recipientAddress = recipientAddress;
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

      this.birth.year,
      numberPad(this.birth.month, 2),
      numberPad(this.birth.day, 2),
      this.birth.departementCode,
      numberPad(this.birth.cityCode, 3),
      wordPad(this.birth.city, 26),
      ' ',
      wordPad(this.birth.job, 30),

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
          lessThanOrEqualTo: 3
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
    const invalid2 = validate(this.birth, birthSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    }

    if (invalid2) {
      throw new ValidationError(invalid2);
    }

    return true;
  }
}

export default R1Recipient;
