import test from 'ava';
import RecipientAddress from '../../lib/address/RecipientAddress.js';

test('set data & type', t => {
  const addr = new RecipientAddress({
    streetNumber: 42,
    streetName: 'Rue de la Victoire',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo'
  });

  t.deepEqual(addr.type, 2);
  t.deepEqual(addr.data, {
    streetNumber: 42,
    streetName: 'Rue de la Victoire',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo'
  });
});

test('validate minimum values', t => {
  const addr = new RecipientAddress({
    streetNumber: 42,
    streetName: 'Rue de la Victoire',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo',
  });

  t.true(addr.validation());
});

test('export minimum values', t => {
  const addr = new RecipientAddress({
    streetNumber: 42,
    streetName: 'Rue de la Victoire',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo'
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
    ' ',
    '    ',
    '    ',
    '    '
  ]);
});

test('validate all values', t => {
  const addr = new RecipientAddress({
    additionalAddress: '4eme etage',
    streetNumber: 42,
    additionalStreetNumber: 'B',
    streetName: 'Rue de la Victoire',
    inseeCode: '109',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo',
    legalCategoryCode: '1234',
    referencePeriod: '0125'
  });

  t.true(addr.validation());
});

test('export maximum values', t => {
  const addr = new RecipientAddress({
    additionalAddress: '4eme etage',
    streetNumber: 42,
    additionalStreetNumber: 'B',
    streetName: 'Rue de la Victoire',
    inseeCode: '109',
    city: 'Paris',
    zipCode: '75009',
    officeDistributor: 'tototototototototototototo',
    legalCategoryCode: '1234',
    referencePeriod: '0125'
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
    ' ',
    '1234',
    '0125',
    '    '
  ]);
});
