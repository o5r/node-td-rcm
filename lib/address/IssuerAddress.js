import Address from './Address';

/**
 * IssuerAddress Class
 *
 * @extends {Address}
 */
class IssuerAddress extends Address {
  /**
   * @param  {Object}  address
   * @param  {String}  [address.additionalAddress]       D 009 Complément d'adresse
   * @param  {String}  [address.streetNumber]            D 010 Numéro dans la voie
   * @param  {String}  [address.additionalStreetNumber]  D 011 B, T, Q, C
   * @param  {String}  [address.streetName]              D 013 Nature et nom de la voie
   * @param  {String}  [address.inseeCode]               D 014 Code INSEE des communes
   * @param  {String}  [address.city]                    D 015 Libellé commune
   * @param  {String}  address.zipCode                   D 017 Code postal
   * @param  {String}  address.officeDistributor         D 019 Bureau distributeur
   * @param  {String}  address.issuanceDate              D 020 Date d'émission de la déclaration
   * @param  {String}  [address.oldSiret]                D 021 Numéro de SIRET au 31/12/2015 en cas de changement
   */
  constructor(address) {
    super(1, address);
  }
}

export default IssuerAddress;
