/**
 * D0Issuer Class
 *
 * Déclarant
 *
 * D 0 Zone
 */
class D0Issuer {
  /**
   * @param  {IssuerIndicativeArea}  issuerIndicativeArea
   * @param  {IssuerAddress}         issuerAddress
   */
  constructor(issuerIndicativeArea, issuerAddress) {
    this.issuerIndicativeArea = issuerIndicativeArea;
    this.issuerAddress = issuerAddress;
  }

  export() {
    this.validation();

    return [
      ...this.issuerIndicativeArea.export(),
      ...this.issuerAddress.export()
    ];
  }

  validation() {
    this.issuerIndicativeArea.validation();
    this.issuerAddress.validation();

    return true;
  }
}

export default D0Issuer;
