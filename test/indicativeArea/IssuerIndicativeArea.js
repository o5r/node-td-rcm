import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import IndicativeArea from '../../lib/indicativeArea/IndicativeArea';
import IssuerIndicativeArea from '../../lib/indicativeArea/IssuerIndicativeArea';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

test('create instance', t => {
  const issuerIndicativeArea = indicativeArea.issuer({
    socialReason: 'Lendix SA',
  });

  t.true(issuerIndicativeArea instanceof IssuerIndicativeArea);
  t.true(issuerIndicativeArea.common instanceof IndicativeArea);
});

test('set data', t => {
  const issuerIndicativeArea = indicativeArea.issuer({
    socialReason: 'Lendix SA'
  });

  t.deepEqual(issuerIndicativeArea.common.data, {
    year: '2016',
    siret: '80426417400017',
    type: 1
  });
  t.deepEqual(issuerIndicativeArea.data, {
    socialReason: 'Lendix SA'
  });
});

test('export', t => {
  const issuerIndicativeArea = indicativeArea.issuer({
    socialReason: 'Lendix SA'
  });

  t.deepEqual(issuerIndicativeArea.export(), [
    '2016',
    '80426417400017',
    1,
    '000000000000000000000000000000',
    'D0',
    'Lendix SA                                         ',
    '0000'
  ]);
});

[{
  data: {socialReason: 'Lendix SA'}
}, {
  data: {socialReason: 'Lendix SA', issuerCodeLegalCategory: '6544'}
}, {
  data: {socialReason: 'Lorem ipsum dolor sit amet, consectetur adipisicing'},
  errors: {socialReason: ['Social reason is too long (maximum is 50 characters)']}
}, {
  data: {socialReason: 'Lendix SA', issuerCodeLegalCategory: '2'},
  errors: {issuerCodeLegalCategory: ['Issuer code legal category is the wrong length (should be 4 characters)']}
}, {
  data: {socialReason: '你好', issuerCodeLegalCategory: '我们法国'},
  errors: {
    socialReason:['Social reason can only contain char from Ox20 to 0x7E'],
    issuerCodeLegalCategory: ['Issuer code legal category can only contain char from Ox20 to 0x7E']
  }
}].forEach(({data, errors}) => {
  test(`validation ${JSON.stringify(data)}`, t => {
    const issuerIndicativeArea = indicativeArea.issuer(data);

    if (!errors) {
      t.true(issuerIndicativeArea.validation());
    } else {
      const error = t.throws(() => {
        issuerIndicativeArea.validation()
      }, ValidationError);

      t.is(error.name, 'ValidationError');
      t.deepEqual(error.errors, errors);
    }
  });
});

