import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import TaxCredit from '../../lib/amountItems/TaxCredit';

test('create instance', t => {
  const taxCredit = new TaxCredit({ AA: 38 });

  t.true(taxCredit instanceof TaxCredit);
});

test('set data', t => {
  const taxCredit = new TaxCredit({ AA: 38, AJ: 2, AD: 65 });

  t.deepEqual(taxCredit.taxCredit, { AA: 38, AJ: 2, AD: 65 });
});

test('export', t => {
  const taxCredit = new TaxCredit({ AA: 38, AJ: 2, AD: 65 });

  t.deepEqual(taxCredit.export(), ['0000000038', '0000000002', '0000000065']);
});

test('throw on export is data is invalid', t => {
  const taxCredit = new TaxCredit({ AA: 'lol' });

  const error = t.throws(() => {
    taxCredit.validation()
  }, ValidationError);

  t.is(error.name, 'ValidationError');
});

[{
  data: { AA: 38 },
}, {
  data: { AJ: 8 },
}, {
  data: { AD: 65 },
}, {
  data: { AA: 38, AJ: 8, AD: 65 },
}, {
  data: { AA: '38', AJ: '8', AD: '65' },
}, {
  data: { AA: 0, AJ: 0, AD: 0 }
}, {
  data: { AA: 'lol', AJ: 'lol', AD: 'lol' },
  errors: { AA: [ 'Aa is not a number' ], AJ: [ 'Aj is not a number' ], AD: [ 'Ad is not a number' ] }
}, {
  data: { AA: 8.5, AJ: 8.5, AD: 8.5 },
  errors: { AA: [ 'Aa must be an integer' ], AJ: [ 'Aj must be an integer' ], AD: [ 'Ad must be an integer' ] }
},  {
  data: { AA: -1, AJ: -1, AD: -1 },
  errors: { AA: [ 'Aa must be greater than or equal to 0' ], AJ: [ 'Aj must be greater than or equal to 0' ], AD: [ 'Ad must be greater than or equal to 0' ] }
}, {
  data: { AA: 12345678901, AJ: 12345678901, AD: 12345678901 },
  errors: { AA: [ 'Aa must be less than or equal to 9999999999' ], AJ: [ 'Aj must be less than or equal to 9999999999' ], AD: [ 'Ad must be less than or equal to 9999999999' ] }
}].forEach(({ data, errors }) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const taxCredit = new TaxCredit(data);

    if (!errors) {
      t.true(taxCredit.validation());
    } else {
      const error = t.throws(() => {
        taxCredit.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

test('default', t => {
  t.deepEqual(TaxCredit.default(), ['0000000000', '0000000000', '0000000000']);
});
