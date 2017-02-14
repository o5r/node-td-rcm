import test from 'ava';
import R1Recipient from '../lib/R1Recipient.js';
import ValidationError from '../lib/ValidationError.js';
import IndicativeArea from '../lib/indicativeArea/IndicativeArea';
import RecipientIndicativeArea from '../lib/indicativeArea/RecipientIndicativeArea';
import RecipientAddress from '../lib/address/RecipientAddress';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

const recipientIndicativeArea = indicativeArea.recipient({
  recipientCode: 'B'
});
const address = new RecipientAddress({
  zipCode: '75009',
  officeDistributor: 'Paris'
});

test('R1Recipient set data', t => {
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

[{
  data: {
    recipient: {
      socialReason: 'Lendix SA'
    },
    birth: {
      year: 1980,
      month: 5,
      day: 22,
      departementCode: '69',
      city: 'Lyon'
    }
  },
}, {
  data: {
    recipient: {
      socialReason: 'Lendix SA'
    },
    birth: {
      year: 1980,
      month: 5,
      day: 22,
      departementCode: '69',
      city: 'Lorem ipsum dolor sit amet, consectetur'
    }
  },
  errors: { city: ['City is too long (maximum is 26 characters)'] }
}, {
  data: {
    recipient: {},
    birth: {
      year: 1980,
      month: 5,
      day: 22,
      departementCode: '69',
      city: 'Paris'
    }
  },
  errors: { socialReason: ['Social reason can\'t be blank'] }
}].forEach(({ data, errors }) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const r1 = new R1Recipient(recipientIndicativeArea, 1, data.recipient, data.birth, address);

    if (!errors) {
      t.true(r1.validation());
    } else {
      const error = t.throws(() => {
        r1.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

test('R1Recipient export', t => {
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
