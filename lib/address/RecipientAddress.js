import Address from './Address';

/**
 * RecipientAddress Class
 *
 * @extends {Address}
 */
class RecipientAddress extends Address {
  /**
   * @param  {Object}  address
   * @param  {String}  [address.additionalAddress]       R 127 Complément d'adresse
   * @param  {String}  [address.streetNumber]            R 128 Numéro dans la voie
   * @param  {String}  [address.additionalStreetNumber]  R 129 Complément d'adresse
   * @param  {String}  [address.streetName]              R 131 Nature et nom de la voie
   * @param  {String}  [address.inseeCode]               R 132 Code INSEE des communes
   * @param  {String}  [address.city]                    R 134 Libellé commune
   * @param  {String}  address.zipCode                   R 135 Code postal
   * @param  {String}  address.officeDistributor         R 137 Bureau distributeur
   * @param  {String}  [address.legalCategoryCode]       R 139 Code catégorie juridique
   * @param  {String}  [address.referencePeriod]         R 140 Période de référence
   */
  constructor(address) {
    super(2, address);
  }
}

export default RecipientAddress;
