import validate from 'validate.js';
import {ValidationError, validationChar} from '../Validation';

import IssuerIndicativeArea from './IssuerIndicativeArea';
import RecipientIndicativeArea from './RecipientIndicativeArea';
import AmountIndicativeArea from './AmountIndicativeArea';

/**
 * IndicativeArea Class
 */
class IndicativeArea {
  /**
   * @param  {Object}  indicativeArea
   * @param  {String}  indicativeArea.year   D 001 / R 101 / R 201  Année
   * @param  {String}  indicativeArea.siret  D 002 / R 102 / R 202 Numéro SIRET du déclarant au 31/12/2016
   * @param  {String}  indicativeArea.type   D 003 / R 103 / R 203 Type de déclaration
   */
  constructor(indicativeArea) {
    this.data = indicativeArea
  }

  /**
   * @param  {Object}  issuer
   * @param  {String}  issuer.socialReason               D 006 Raison sociale (désignation délivrée par l’INSEE)
   * @param  {Number}  [issuer.issuerCodeLegalCategory]  D 007 Code catégorie juridique du déclarant
   */
  issuer(issuer) {
    return new IssuerIndicativeArea(this, issuer);
  }

  /**
   * @param  {Object}  recipient
   * @param  {String}  [recipient.establishmentCode]  R 104 Code établissement
   * @param  {String}  [recipient.branchCode]         R 105 Code guichet
   * @param  {String}  [recipient.accountNumber]      R 106 Numéro de compte ou numéro de contrat
   * @param  {String}  [recipient.key]                R 107 Clé
   * @param  {String}  [recipient.accountNature]      R 109 Nature du compte ou du contrat
   * @param  {String}  [recipient.accountType]        R 110 Type de compte
   * @param  {String}  recipient.recipientCode        R 111 Code bénéficiaire
   */
  recipient(recipient) {
    return new RecipientIndicativeArea(this, recipient);
  }

  /**
   * @param  {Object}  amount
   * @param  {String}  [amount.establishmentCode]  R 204 Code établissement
   * @param  {String}  [amount.branchCode]         R 205 Code guichet
   * @param  {String}  [amount.accountNumber]      R 206 Numéro de compte ou numéro de contrat
   * @param  {String}  [amount.key]                R 207 Clé
   */
  amountR2(amount) {
    return new AmountIndicativeArea(this, 'R2', amount);
  }

  export() {
    this.validation();

    return[
      this.data.year,
      this.data.siret,
      this.data.type,
    ];
  }

  validation() {
    const commonSchema = {
      year: {
        presence: true,
        length: { is: 4 },
        ...validationChar
      },
      siret: {
        presence: true,
        length: { is: 14 },
        ...validationChar
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

    const invalid = validate(this.data, commonSchema);

    if (invalid) {
      throw new ValidationError(invalid);
    } else {
      return true;
    }
  }
}

export default IndicativeArea;
