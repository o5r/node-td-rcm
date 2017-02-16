import test from 'ava';
import {ValidationError} from '../../lib/Validation';
import IssuerAddress from '../../lib/address/IssuerAddress';

const minimumValues = {
  streetNumber: 42,
  streetName: 'Rue de la Victoire',
  city: 'Paris',
  zipCode: '75009',
  officeDistributor: 'tototototototototototototo',
  issuanceDate: '20170125',
}

test('set data & type', t => {
  const addr = new IssuerAddress(minimumValues);

  t.deepEqual(addr.type, 1);
  t.deepEqual(addr.data, minimumValues);
});

test('validate minimum values', t => {
  const addr = new IssuerAddress(minimumValues);

  t.true(addr.validation());
});

[{
  field: 'issuanceDate',
  cases: [{
    value: '20172412',
    errors: {issuanceDate: ['Issuance date is invalid']}
  }, {
    value: 'toto',
    errors: {issuanceDate: ['Issuance date is the wrong length (should be 8 characters)', 'Issuance date is invalid']}
  }]
}].forEach(({field, cases}) => {
  cases.forEach(({value, errors}) => {
    test(`validate ${field} with value ${value}`, t => {
      minimumValues[field] = value;

      const addr = new IssuerAddress(minimumValues);


      if (!errors) {
        t.true(addr.validation());
      } else {
        const error = t.throws(() => {
          addr.validation()
        }, ValidationError);

        t.is(error.name, 'ValidationError');
        t.deepEqual(error.errors, errors);
      }
    });
  });
});

test('export minimum values', t => {
  const addr = new IssuerAddress({
    streetNumber: 42,
    streetName: 'Rue de la Victoire',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo',
    issuanceDate: '20170125',
  });

  t.deepEqual(addr.export(), [
    '                                ',
    '0042',
    ' ',
    ' ',
    'Rue de la Victoire        ',
    '00000',
    ' ',
    'Paris                     ',
    '75009',
    ' ',
    'tototototototototototototo',
    '20170125',
    '              ',
    '                                                                                                                                                                               '
  ]);
});

test('validate all values', t => {
  const addr = new IssuerAddress({
    additionalAddress: '4eme etage',
    streetNumber: 42,
    additionalStreetNumber: 'B',
    streetName: 'Rue de la Victoire',
    inseeCode: '109',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo',
    issuanceDate: '20170125',
    oldSiret: '73282932000074'
  });

  t.true(addr.validation());
});

test('export minimum values', t => {
  const addr = new IssuerAddress({
    additionalAddress: '4eme etage',
    streetNumber: 42,
    additionalStreetNumber: 'B',
    streetName: 'Rue de la Victoire',
    inseeCode: '109',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo',
    issuanceDate: '20170125',
    oldSiret: '73282932000074'
  });

  t.deepEqual(addr.export(), [
    '4eme etage                      ',
    '0042',
    'B',
    ' ',
    'Rue de la Victoire        ',
    '00109',
    ' ',
    'Paris                     ',
    '75009',
    ' ',
    'tototototototototototototo',
    '20170125',
    '73282932000074',
    '                                                                                                                                                                               '
  ]);
});
