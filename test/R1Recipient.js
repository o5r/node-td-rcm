import test from 'ava';
import R1Recipient from '../lib/R1Recipient.js';

import RecipientIndicativeArea from '../lib/indicativeArea/RecipientIndicativeArea';
import RecipientAddress from '../lib/address/RecipientAddress';

test('R1Recipient set data', t => {
  const recipientIndicativeArea = new RecipientIndicativeArea({
    year: '2016',
    siret: '80426417400017',
    type: 1,
    recipientCode: 'B'
  });
  const address = new RecipientAddress({
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
  const r1 = new R1Recipient(recipientIndicativeArea, 1, recipient, birth, address);

  t.true(r1.recipientIndicativeArea instanceof RecipientIndicativeArea);
  t.true(r1.recipientAddress instanceof RecipientAddress);

  t.is(r1.recipientType, 1);
  t.deepEqual(r1.recipient, recipient);
  t.deepEqual(r1.birth, birth);
});

test('R1Recipient validation', t => {
  const recipientIndicativeArea = new RecipientIndicativeArea({
    year: '2016',
    siret: '80426417400017',
    type: 1,
    recipientCode: 'B'
  });
  const address = new RecipientAddress({
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

  const r1 = new R1Recipient(recipientIndicativeArea, 1, recipient, birth, address);

  t.true(r1.validation());
});

test('R1Recipient export', t => {
  const recipientIndicativeArea = new RecipientIndicativeArea({
    year: '2016',
    siret: '80426417400017',
    type: 1,
    recipientCode: 'B'
  });
  const address = new RecipientAddress({
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

  const r1 = new R1Recipient(recipientIndicativeArea, 1, recipient, birth, address);

  t.deepEqual(r1.export(), [
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
    '    '
  ]);
});
