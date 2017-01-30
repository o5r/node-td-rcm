import IndicativeArea from './IndicativeArea.js';

/**
 * IssuerIndicativeArea Class
 * For D0
 *
 * @extends {IndicativeArea}
 */
class IssuerIndicativeArea extends IndicativeArea {
  /**
   * @param  {Object}  indicativeArea
   * @param  {String}  indicativeArea.year                       D 001 Année
   * @param  {String}  indicativeArea.siret                      D 002 Numéro SIRET du déclarant au 31/12/2016
   * @param  {String}  indicativeArea.type                       D 003 Type de déclaration
   * @param  {String}  indicativeArea.socialReason               D 006 Raison sociale (désignation délivrée par l’INSEE)
   * @param  {Number}  [indicativeArea.issuerCodeLegalCategory]  D 007 Code catégorie juridique du déclarant
   */
  constructor(indicativeArea) {
    super(1, indicativeArea);
  }
}

export default IssuerIndicativeArea;
