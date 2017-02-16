import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import IndicativeArea from '../../lib/indicativeArea/IndicativeArea';
import AmountIndicativeArea from '../../lib/indicativeArea/AmountIndicativeArea';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

test('create instance', t => {
  const amountIndicativeArea = indicativeArea.amountR2();

  t.true(amountIndicativeArea instanceof AmountIndicativeArea);
  t.true(amountIndicativeArea.common instanceof IndicativeArea);
});

test('set data', t => {
  const amountIndicativeArea = indicativeArea.amountR2();

  t.deepEqual(amountIndicativeArea.common.data, {
    year: '2016',
    siret: '80426417400017',
    type: 1
  });
  t.deepEqual(amountIndicativeArea.data, {});
});

test('export', t => {
  const amountIndicativeArea = indicativeArea.amountR2({});

  t.deepEqual(amountIndicativeArea.export(), [
    '2016',
    '80426417400017',
    1,
    '         ',
    '     ',
    '              ',
    '  ',
    'R2'
  ]);
});

[{
  data: {}
}, {
  data: {
    establishmentCode: '1234567890',
    branchCode: '123456',
    accountNumber: '123456789012345',
    key: '123'
  },
  errors: {
    establishmentCode: ['Establishment code is too long (maximum is 9 characters)'],
    branchCode: ['Branch code is the wrong length (should be 5 characters)'],
    accountNumber: ['Account number is too long (maximum is 14 characters)'],
    key: ['Key is the wrong length (should be 2 characters)']
  }
}, {
  data: {
    establishmentCode: '你好',
    branchCode: '你是水獭吗',
    accountNumber: '你好',
    key: '你好'
  },
  errors: {
    establishmentCode: ['Establishment code can only contain char from Ox20 to 0x7E'],
    branchCode: ['Branch code can only contain char from Ox20 to 0x7E'],
    accountNumber: ['Account number can only contain char from Ox20 to 0x7E'],
    key: ['Key can only contain char from Ox20 to 0x7E']
  }
}].forEach(({data, errors}) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const amountIndicativeArea = indicativeArea.amountR2(data);

    if (!errors) {
      t.true(amountIndicativeArea.validation());
    } else {
      const error = t.throws(() => {
        amountIndicativeArea.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

