import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import FixedIncomeProducts from '../../lib/amountItems/FixedIncomeProducts';

test('create instance', t => {
  const fixedIncomeProducts = new FixedIncomeProducts({ AR: 38 });

  t.true(fixedIncomeProducts instanceof FixedIncomeProducts);
});

test('set data', t => {
  const fixedIncomeProducts = new FixedIncomeProducts({ AR: 38, AS: 2});

  t.deepEqual(fixedIncomeProducts.fixedIncomeProducts, { AR: 38, AS: 2});
});

test('export', t => {
  const fixedIncomeProducts = new FixedIncomeProducts({ AR: 38, AS: 2});

  t.deepEqual(fixedIncomeProducts.export(), ['0000000038', '0000000002']);
});

test('throw on export is data is invalid', t => {
  const fixedIncomeProducts = new FixedIncomeProducts({ AR: 'lol' });

  const error = t.throws(() => {
    fixedIncomeProducts.validation()
  }, ValidationError);

  t.is(error.name, 'ValidationError');
});

[{
  data: { AR: 38 },
}, {
  data: { AS: 8 },
}, {
  data: { AR: 38, AS: 8 },
}, {
  data: { AR: '38', AS: '8' },
}, {
  data: { AR: 0, AS: 0 }
}, {
  data: { AR: 'lol', AS: 'lol' },
  errors: { AR: [ 'Ar is not a number' ], AS: [ 'As is not a number' ] }
}, {
  data: { AR: 8.5, AS: 8.5 },
  errors: { AR: [ 'Ar must be an integer' ], AS: [ 'As must be an integer' ] }
},  {
  data: { AR: -1, AS: -1 },
  errors: { AR: [ 'Ar must be greater than or equal to 0' ], AS: [ 'As must be greater than or equal to 0' ] }
}, {
  data: { AR: 12345678901, AS: 12345678901 },
  errors: { AR: [ 'Ar must be less than or equal to 9999999999' ], AS: [ 'As must be less than or equal to 9999999999' ] }
}].forEach(({ data, errors }) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const fixedIncomeProducts = new FixedIncomeProducts(data);

    if (!errors) {
      t.true(fixedIncomeProducts.validation());
    } else {
      const error = t.throws(() => {
        fixedIncomeProducts.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

test('default', t => {
  t.deepEqual(FixedIncomeProducts.default(), ['0000000000', '0000000000']);
});
