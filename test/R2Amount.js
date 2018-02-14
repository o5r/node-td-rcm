import test from 'ava';
import R2Amount from '../lib/R2Amount';
import IndicativeArea from '../lib/indicativeArea/IndicativeArea';
import AmountIndicativeArea from '../lib/indicativeArea/AmountIndicativeArea';
import {TaxCredit, FixedIncomeProducts, CrowdfundingProducts, Fees} from '../lib/amountItems';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

const amountIndicativeArea = indicativeArea.amountR2();

test('set data', t => {
  const taxCredit = new TaxCredit({AD: 10});
  const fixedIncomeProducts = new FixedIncomeProducts({AR: 142, AS: 10});
  const crowdfundingProducts = new CrowdfundingProducts({KR: 153, KS: 21});
  const fees = new Fees(9);

  const r2 = new R2Amount({amountIndicativeArea, taxCredit, fixedIncomeProducts, crowdfundingProducts, fees});

  t.true(r2.amountIndicativeArea instanceof AmountIndicativeArea);
  t.true(r2.taxCredit instanceof TaxCredit);
  t.true(r2.fixedIncomeProducts instanceof FixedIncomeProducts);
  t.true(r2.crowdfundingProducts instanceof CrowdfundingProducts);
  t.true(r2.fees instanceof Fees);
});

test('validation', t => {
  const taxCredit = new TaxCredit({AD: 10});
  const fixedIncomeProducts = new FixedIncomeProducts({AR: 142, AS: 10});
  const crowdfundingProducts = new CrowdfundingProducts({KR: 153, KS: 21});
  const fees = new Fees(9);

  const r2 = new R2Amount({amountIndicativeArea, taxCredit, fixedIncomeProducts, crowdfundingProducts, fees});

  t.true(r2.validation());
});

test('export', t => {
  const taxCredit = new TaxCredit({AD: 10});
  const fixedIncomeProducts = new FixedIncomeProducts({AR: 142, AS: 10});
  const crowdfundingProducts = new CrowdfundingProducts({KR: 153, KS: 21});
  const fees = new Fees(9);

  const r2 = new R2Amount({amountIndicativeArea, taxCredit, fixedIncomeProducts, crowdfundingProducts, fees});

  require('fs').writeFileSync('toto.txt', JSON.stringify(r2.export()));


  t.deepEqual(r2.export(), [
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
    '0000000142',
    '0000000010',
    '0000000153',
    '0000000021',
    '                                                                      ',
    '0000000000',
    '0000000000',
    '0000000009',
    '0000000000',
    '0000000000',
    '                   '
  ]);
});
