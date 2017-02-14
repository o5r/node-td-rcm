import {numberPad, wordPad, fillWith} from './utils.js';

/**
 * T0Totalization Class
 *
 * Article totalisation
 *
 * T0 zone
 *
 * @private
 */
class T0Totalization {
  /**
   * @param  {RCM} rcm
   */
  constructor(rcm) {
    this.rcm = rcm;
  }

  export() {
    const records = this.rcm.recipients.reduce((acc, recipient) => {
      acc.r1++;
      if (recipient[1]) {
        acc.r2++;
      }

      if (recipient[2]) {
        acc.r3++;
      }

      if (recipient[3]) {
        acc.r4++;
      }

      return acc;
    }, {
      r1: 0,
      r2: 0,
      r3: 0,
      r4: 0
    });

    return [
      this.rcm.d0.issuerIndicativeArea.common.data.year,
      this.rcm.d0.issuerIndicativeArea.common.data.siret,
      this.rcm.d0.issuerIndicativeArea.common.data.type,
      fillWith('9', 30),
      'T0',
      numberPad(records.r1, 8),
      numberPad(records.r2, 8),
      numberPad(records.r3, 8),
      numberPad(records.r4, 8),
      wordPad(this.rcm.personInCharge.fullname, 50),
      numberPad(this.rcm.personInCharge.phone, 10),
      wordPad(this.rcm.personInCharge.email, 60),
      fillWith(' ', 227)
    ];
  }
}

export default T0Totalization;
