import IndicativeArea from './IndicativeArea.js';

/**
 * AmountIndicative Class
 *
 * For R 2 zone
 * @extends {IndicativeArea}
 */
class AmountIndicative extends IndicativeArea {
  /**
   * @param  {Object}  indicativeArea
   * @param  {String}  indicativeArea.year                 R 201 Année
   * @param  {String}  indicativeArea.siret                R 202 Numéro SIRET du déclarant au 31/12/2016
   * @param  {String}  indicativeArea.type                 R 203 Type de déclaration
   * @param  {String}  [indicativeArea.establishmentCode]  R 204 Code établissement
   * @param  {String}  [indicativeArea.branchCode]         R 205 Code guichet
   * @param  {String}  [indicativeArea.accountNumber]      R 206 Numéro de compte ou numéro de contrat
   * @param  {String}  [indicativeArea.key]                R 207 Clé
   */
  constructor(indicativeArea) {
    super(3, indicativeArea);
  }
}

export default AmountIndicative;
