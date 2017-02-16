import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import IndicativeArea from '../../lib/indicativeArea/IndicativeArea';
import RecipientIndicativeArea from '../../lib/indicativeArea/RecipientIndicativeArea';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

test('create instance', t => {
  const recipientIndicativeArea = indicativeArea.recipient({
    recipientCode: 'B'
  });

  t.true(recipientIndicativeArea instanceof RecipientIndicativeArea);
  t.true(recipientIndicativeArea.common instanceof IndicativeArea);
});

test('set data', t => {
  const recipientIndicativeArea = indicativeArea.recipient({
    recipientCode: 'B'
  });

  t.deepEqual(recipientIndicativeArea.common.data, {
    year: '2016',
    siret: '80426417400017',
    type: 1
  });
  t.deepEqual(recipientIndicativeArea.data, {
    recipientCode: 'B'
  });
});

test('export', t => {
  const recipientIndicativeArea = indicativeArea.recipient({
    recipientCode: 'B'
  });

  t.deepEqual(recipientIndicativeArea.export(), [
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
    'B'
  ]);
});

[{
  data: {recipientCode: 'B'}
}, {
  data: {accountNature: '1', accountType: '2', recipientCode: 'B'}
}, {
  data: {accountNature: 8, accountType: 25, recipientCode: 'A'},
  errors: {accountNature: ['Account nature must be less than or equal to 3'], accountType: ['Account type must be less than or equal to 6'], recipientCode: ['A is not included in the list']}
}].forEach(({data, errors}) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const recipientIndicativeArea = indicativeArea.recipient(data);

    if (!errors) {
      t.true(recipientIndicativeArea.validation());
    } else {
      const error = t.throws(() => {
        recipientIndicativeArea.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

