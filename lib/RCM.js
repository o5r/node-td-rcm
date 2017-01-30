import T0Totalization from './T0Totalization';

/**
 * RCM class
 */
class RCM {
  /**
   * @param  {D0Issuer} d0
   * @param  {Object}   [personInCharge]
   * @param  {String}   [personInCharge.fullname]  T010 Nom Prénom
   * @param  {String}   [personInCharge.phone]     T011 Numéro de téléphone
   * @param  {String}   [personInCharge.email]     T012 Adresse courriel
   */
  constructor(d0, personInCharge = {}) {
    this.d0 = d0;
    this.personInCharge = personInCharge;
    this.recipients = [];
  }

  addRecipient(r1, r2, r3) {
    this.recipients.push([r1, r2, r3])
  }

  export(inline = false) {
    const t0 = new T0Totalization(this);

    const exportedRecipient = this.recipients.reduce((acc, r) => {
      return (inline) ? acc.concat([
        '\n',
        ...r[0].export().join(''),
        '\n',
        ...r[1].export().join('')
      ]).join('') : acc.concat([
        ...r[0].export(),
        ...r[1].export()
      ]);
    }, []);

    return (inline) ? [
      ...this.d0.export().join(''),
      ...exportedRecipient,
      '\n',
      ...t0.export().join('')
    ].join('') : [
      ...this.d0.export(),
      ...exportedRecipient,
      '\n',
      ...t0.export()
    ];
  }
}

export default RCM;
