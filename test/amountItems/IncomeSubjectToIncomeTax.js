import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import IncomeSubjectToIncomeTax from '../../lib/amountItems/IncomeSubjectToIncomeTax';

test('create instance', t => {
  const incomeSubjectToIncomeTax = new IncomeSubjectToIncomeTax({ BS: 38 });

  t.true(incomeSubjectToIncomeTax instanceof IncomeSubjectToIncomeTax);
});

test('set data', t => {
  const incomeSubjectToIncomeTax = new IncomeSubjectToIncomeTax({ BS: 38, DQ: 2, BU: 65 });

  t.deepEqual(incomeSubjectToIncomeTax.incomeSubjectToIncomeTax, { BS: 38, DQ: 2, BU: 65 });
});

test('export', t => {
  const incomeSubjectToIncomeTax = new IncomeSubjectToIncomeTax({ BS: 38, DQ: 2, BU: 65 });

  t.deepEqual(incomeSubjectToIncomeTax.export(), ['0000000038', '0000000002', '0000000065']);
});

test('throw on export is data is invalid', t => {
  const incomeSubjectToIncomeTax = new IncomeSubjectToIncomeTax({ BS: 'lol' });

  const error = t.throws(() => {
    incomeSubjectToIncomeTax.validation()
  }, ValidationError);

  t.is(error.name, 'ValidationError');
});

[{
  data: { BS: 38 },
}, {
  data: { DQ: 8 },
}, {
  data: { BU: 65 },
}, {
  data: { BS: 38, DQ: 8, BU: 65 },
}, {
  data: { BS: '38', DQ: '8', BU: '65' },
}, {
  data: { BS: 0, DQ: 0, BU: 0 }
}, {
  data: { BS: 'lol', DQ: 'lol', BU: 'lol' },
  errors: { BS: [ 'Bs is not a number' ], DQ: [ 'Dq is not a number' ], BU: [ 'Bu is not a number' ] }
}, {
  data: { BS: 8.5, DQ: 8.5, BU: 8.5 },
  errors: { BS: [ 'Bs must be an integer' ], DQ: [ 'Dq must be an integer' ], BU: [ 'Bu must be an integer' ] }
},  {
  data: { BS: -1, DQ: -1, BU: -1 },
  errors: { BS: [ 'Bs must be greater than or equal to 0' ], DQ: [ 'Dq must be greater than or equal to 0' ], BU: [ 'Bu must be greater than or equal to 0' ] }
}, {
  data: { BS: 12345678901, DQ: 12345678901, BU: 12345678901 },
  errors: { BS: [ 'Bs must be less than or equal to 9999999999' ], DQ: [ 'Dq must be less than or equal to 9999999999' ], BU: [ 'Bu must be less than or equal to 9999999999' ] }
}].forEach(({ data, errors }) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const incomeSubjectToIncomeTax = new IncomeSubjectToIncomeTax(data);

    if (!errors) {
      t.true(incomeSubjectToIncomeTax.validation());
    } else {
      const error = t.throws(() => {
        incomeSubjectToIncomeTax.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

test('default', t => {
  t.deepEqual(IncomeSubjectToIncomeTax.default(), ['0000000000', '0000000000', '0000000000']);
});
