import cp from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import test from 'ava';
import RCM from '../lib/RCM.js';

import D0Issuer from '../lib/D0Issuer';
import R1Recipient from '../lib/R1Recipient';
import R2Amount from '../lib/R2Amount';
import IndicativeArea from '../lib/indicativeArea/IndicativeArea';
import RecipientAddress from '../lib/address/RecipientAddress';
import IssuerAddress from '../lib/address/IssuerAddress';
import {TaxCredit, FixedIncomeProducts, CrowdfundingProducts, Fees} from '../lib/amountItems';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

indicativeArea.issuer({
  socialReason: 'Lendix IFP'
});

indicativeArea.recipient({
  recipientCode: 'B'
});

indicativeArea.amountR2();

function newRecipient() {
  const recipientAddress = new RecipientAddress({
    zipCode: '75009',
    officeDistributor: 'Paris'
  });
  const recipient = {
    socialReason: 'Lendix SA'
  };
  const birth = {
    year: 1980,
    month: 5,
    day: 22,
    departementCode: '69',
    city: 'Lyon'
  };

  return new R1Recipient({
    recipientIndicativeArea: indicativeArea.recipient({ recipientCode: 'B' }),
    recipientType:1,
    recipient,
    birth,
    recipientAddress
  });
}

function newAmount(){
  const taxCredit = new TaxCredit({AD: 10});
  const fixedIncomeProducts = new FixedIncomeProducts({AR: 69});
  const crowdfundingProducts = new CrowdfundingProducts({KR: 952, KS:29});
  const fees = new Fees(9);

  return new R2Amount({
    amountIndicativeArea: indicativeArea.amountR2(),
    taxCredit,
    fixedIncomeProducts,
    crowdfundingProducts,
    fees
  });
}

function newD0Issuer() {
  const address = new IssuerAddress({
    zipCode: '75009',
    officeDistributor: 'Paris',
    issuanceDate: '20161224'
  });

  return new D0Issuer(indicativeArea.issuer({socialReason: 'Lendix SA'}), address);
}

test('new instance', t => {
  const issuer = newD0Issuer();
  const rcm = new RCM(issuer);

  t.true(rcm.d0 instanceof D0Issuer);
});

test('push recipient', t => {
  const issuer = newD0Issuer();
  const rcm = new RCM(issuer);

  rcm.addRecipient(newRecipient(), newAmount());

  t.is(rcm.recipients.length, 1)
});

test('export', t => {
  const issuer = newD0Issuer();
  const rcm = new RCM(issuer);

  rcm.addRecipient(newRecipient(), newAmount());

  t.deepEqual(rcm.export(), [
    '2016',
    '80426417400017',
    1,
    '000000000000000000000000000000',
    'D0',
    'Lendix SA                                         ',
    '0000',
    '                                ',
    '0000',
    ' ',
    ' ',
    '                          ',
    '00000',
    ' ',
    '                          ',
    '75009',
    ' ',
    'Paris                     ',
    '20161224',
    '              ',
    '                                                                                                                                                                               ',
    '2016',
    '80426417400017',
    1,
    '         ',
    '     ',
    '              ',
    '  ',
    'R1',
    ' ',
    ' ',
    'B',
    '00000000000000',
    'Lendix SA                                         ',
    '                              ',
    '                    ',
    '                              ',
    '                    ',
    ' ',
    1980,
    '05',
    '22',
    '69',
    '000',
    'Lyon                      ',
    ' ',
    '                              ',
    '                                ',
    '0000',
    ' ',
    ' ',
    '                          ',
    '00000',
    ' ',
    '                          ',
    '75009',
    ' ',
    'Paris                     ',
    ' ',
    '    ',
    '    ',
    '    ',
    '2016',
    '80426417400017',
    1,
    '         ',
    '     ',
    '              ',
    '  ',
    'R2',
    '0000000000',
    '0000000000',
    '0000000010',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '          ',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000000',
    '0000000069',
    '0000000000',
    '0000000952',
    '0000000029',
    '                                                                      ',
    '0000000000',
    '0000000000',
    '0000000009',
    '0000000000',
    '0000000000',
    '                   ',
    '2016',
    '80426417400017',
    1,
    '999999999999999999999999999999',
    'T0',
    '00000001',
    '00000001',
    '00000000',
    '00000000',
    '                                                  ',
    '0000000000',
    '                                                            ',
    '                                                                                                                                                                                                                                   '
  ]);
});

test('export inline', t => {
  const expectedExport = String(require('fs').readFileSync(`${__dirname}/export.txt`));
  const issuer = newD0Issuer();
  const rcm = new RCM(issuer);

  rcm.addRecipient(newRecipient(), newAmount());

  t.is(rcm.export(true), expectedExport);
});

test('toFile', t => {
  const pathFile = path.join(os.tmpdir(), 'ifu-test-tofile.txt');
  const issuer = newD0Issuer();
  const rcm = new RCM(issuer);

  rcm.addRecipient(new R1Recipient({
    recipientIndicativeArea: indicativeArea.recipient({ recipientCode: 'B' }),
    recipientType: 2,
    recipient: {
      familyname: 'Henry',
      firstnames: 'Mattéo',
      sex: 2
    },
    birth: {
      year: 1980,
      month: 5,
      day: 22,
      departementCode: '69',
      city: 'Lyon'
    },
    recipientAddress: new RecipientAddress({
      zipCode: '75009',
      officeDistributor: 'Paris'
    })
  }), newAmount());

  return rcm.toFile(pathFile).then(() => {
    t.true(fs.existsSync(pathFile));

    const fileI = cp.execSync(`file -i ${pathFile}`);
    const charset = fileI.toString().match(/charset=(.*)/);

    t.is(charset[1], 'iso-8859-1');
  });
});
