import test from 'ava';
import D0Issuer from '../lib/D0Issuer.js';
import IndicativeArea from '../lib/indicativeArea/IndicativeArea';
import IssuerIndicativeArea from '../lib/indicativeArea/IssuerIndicativeArea';
import IssuerAddress from '../lib/address/IssuerAddress';

const indicativeArea = new IndicativeArea({
  year: '2016',
  siret: '80426417400017',
  type: 1
});

test('D0Issuer set data', t => {
  const issuerIndicativeArea = indicativeArea.issuer({
    socialReason: 'Lendix SA',
  });
  const address = new IssuerAddress({
    zipCode: '75009',
    officeDistributor: 'Paris',
    issuanceDate: '20161224'
  });
  const issuer = new D0Issuer(issuerIndicativeArea, address);

  t.true(issuer.issuerIndicativeArea instanceof IssuerIndicativeArea);
  t.true(issuer.issuerAddress instanceof IssuerAddress);
});

test('D0Issuer validation', t => {
  const issuerIndicativeArea = indicativeArea.issuer({
    socialReason: 'Lendix SA',
  });
  const address = new IssuerAddress({
    zipCode: '75009',
    officeDistributor: 'Paris',
    issuanceDate: '20161224'
  });
  const issuer = new D0Issuer(issuerIndicativeArea, address);

  t.true(issuer.validation());
});

test('D0Issuer export', t => {
  const issuerIndicativeArea = indicativeArea.issuer({
    socialReason: 'Lendix SA',
  });
  const address = new IssuerAddress({
    zipCode: '75009',
    officeDistributor: 'Paris',
    issuanceDate: '20161224'
  });
  const issuer = new D0Issuer(issuerIndicativeArea, address);

  t.deepEqual(issuer.export(), [
    '2016',
    '80426417400017',
    1,
    '000000000000000000000000000000',
    'D0',
    'Lendix SA                                         ',
    '0000',
    '                                ',
    '0000',
    ' ',
    ' ',
    '                          ',
    '00000',
    ' ',
    '                          ',
    '75009',
    ' ',
    'Paris                     ',
    '20161224',
    '              ',
    '                                                                                                                                                                               '
  ]);
});
