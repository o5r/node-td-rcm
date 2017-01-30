import IndicativeArea from './IndicativeArea.js';

/**
 * RecipientIndicativeArea Class
 * For R 1
 *
 * @extends {IndicativeArea}
 */
class RecipientIndicativeArea extends IndicativeArea {
  /**
   * @param  {Object}  indicativeArea
   * @param  {String}  indicativeArea.year                 R 101 Année
   * @param  {String}  indicativeArea.siret                R 102 Numéro SIRET du déclarant au 31/12/2016
   * @param  {String}  indicativeArea.type                 R 103 Type de déclaration
   * @param  {String}  [indicativeArea.establishmentCode]  R 104 Code établissement
   * @param  {String}  [indicativeArea.branchCode]         R 105 Code guichet
   * @param  {String}  [indicativeArea.accountNumber]      R 106 Numéro de compte ou numéro de contrat
   * @param  {String}  [indicativeArea.key]                R 107 Clé
   * @param  {String}  [indicativeArea.accountNature]      R 109 Nature du compte ou du contrat
   * @param  {String}  [indicativeArea.accountType]        R 110 Type de compte
   * @param  {String}  indicativeArea.recipientCode        R 111 Code bénéficiaire

   */
  constructor(indicativeArea) {
    super(2, indicativeArea);
  }
}

export default RecipientIndicativeArea;
