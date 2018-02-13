import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import CrowdfundingProducts from '../../lib/amountItems/CrowdfundingProducts';

test('create instance', t => {
  const fixedIncomeProducts = new CrowdfundingProducts({ KR: 48 });

  t.true(fixedIncomeProducts instanceof CrowdfundingProducts);
});

test('set data', t => {
  const fixedIncomeProducts = new CrowdfundingProducts({ KR: 978, KS: 17 });

  t.deepEqual(fixedIncomeProducts.crowdfundingProducts, { KR: 978, KS: 17 });
});

test('throw on export is data is invalid', t => {
  const fixedIncomeProducts = new CrowdfundingProducts({ KR: 'invalid' });

  const error = t.throws(() => {
    fixedIncomeProducts.validation()
  }, ValidationError);

  t.is(error.name, 'ValidationError');
});

[{
  data: { KR: 38 },
}, {
  data: { KS: 8 },
}, {
  data: { KR: 38, KS: 8 },
}, {
  data: { KR: '38', KS: '8' },
}, {
  data: { KR: 0, KS: 0 }
}, {
  data: { KR: 'lol', KS: 'lol' },
  errors: { KR: ['Kr is not a number'], KS: ['Ks is not a number'] }
}, {
  data: { KR: 8.5, KS: 8.5 },
  errors: { KR: ['Kr must be an integer'], KS: ['Ks must be an integer'] }
}, {
  data: { KR: -1, KS: -1 },
  errors: { KR: ['Kr must be greater than or equal to 0'], KS: ['Ks must be greater than or equal to 0'] }
}, {
  data: { KR: 12345678901, KS: 12345678901 },
  errors: { KR: ['Kr must be less than or equal to 9999999999'], KS: ['Ks must be less than or equal to 9999999999'] }
}].forEach(({ data, errors }) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const fixedIncomeProducts = new CrowdfundingProducts(data);

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
  t.deepEqual(CrowdfundingProducts.default(), ['0000000000', '0000000000', '                                                                      ']);
});
