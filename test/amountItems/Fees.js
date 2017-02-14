import test from 'ava';
import ValidationError from '../../lib/ValidationError.js';
import Fees from '../../lib/amountItems/Fees.js';

test('create instance', t => {
  const fees = new Fees(20);

  t.true(fees instanceof Fees);
});

test('set data', t => {
  const fees = new Fees(20);

  t.is(fees.fees, 20);
});

test('export', t => {
  const fees = new Fees(20);

  t.deepEqual(fees.export(), ['0000000020']);
});

test('throw on export is data is invalid', t => {
  const fees = new Fees('lol');

  const error = t.throws(() => {
    fees.validation()
  }, ValidationError);

  t.is(error.name, 'ValidationError');
});

[{
  fee: 20,
}, {
  fee: '20',
}, {
  fee: 0
}, {
  fee: 'lol',
  errors: { fees: ['Fees is not a number'] }
}, {
  fee: 8.5,
  errors: { fees: ['Fees must be an integer'] }
},  {
  fee: -1,
  errors: { fees: ['Fees must be greater than or equal to 0'] }
}, {
  fee: 12345678901,
  errors: { fees: ['Fees must be less than or equal to 9999999999'] }
}].forEach(({ fee, errors }) => {
  test(`validation '${fee}'`, t => {
    const fees = new Fees(fee);

    if (!errors) {
      t.true(fees.validation());
    } else {
      const error = t.throws(() => {
        fees.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

test('default', t => {
  t.deepEqual(Fees.default(), ['0000000000']);
});
