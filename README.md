# TD/RCM ifu generator

**T**ransfert des **d**éclarations de **r**evenus de **c**apitaux **m**obiliers par procédé informatique

[![Codeship](https://img.shields.io/codeship/c1590490-c92d-0134-076b-6a795a0b4831/master.svg)](https://app.codeship.com/projects/199198) [![npm](https://img.shields.io/npm/dt/td-rcm.svg)](https://www.npmjs.com/package/td-rcm) [![npm](https://img.shields.io/npm/v/td-rcm.svg)](https://www.npmjs.com/package/td-rcm) [![license](https://img.shields.io/github/license/lendix/node-td-rcm.svg)](https://github.com/Lendix/node-td-rcm/blob/master/LICENSE.md)

## Install

```JavaScript
npm i td-rcm
```

## Usage

```
import {
  IssuerIndicativeArea,
  IssuerAddress,
  D0Issuer,
  RecipientIndicativeArea,
  RecipientAddress,
  R1Recipient,
  AmountIndicativeArea,
  TaxCredit,
  FixedIncomeProducts,
  IncomeSubjectToIncomeTax,
  R2Amount,
  RCM
} from 'td-rcm';

/*
  Article déclarant D0
 */
const indicativeArea = new IssuerIndicativeArea({
  year: '2016',
  siret: '12345678912345',
  type: 1,
  socialReason: 'Loutre SAS',
});
const issuerAddress = new IssuerAddress({
  zipCode: '75009',
  streetNumber: '42',
  streetName: 'Rue des loutres',
  officeDistributor: 'Paris',
  issuanceDate: '20161224'
});

const d0 = new D0Issuer(indicativeArea, issuerAddress);
/* */

/*
  Article Bénéficiaire R1
 */
const recipientIndicativeArea = new RecipientIndicativeArea({
  year: '2016',
  siret: '12345678912345',
  type: 1,
  recipientCode: 'B'
});
const recipientAddress = new RecipientAddress({
  zipCode: '75012',
  officeDistributor: 'Paris'
});

const r1 = new R1Recipient(recipientIndicativeArea, 2, {
  familyname: 'Delorme',
  firstnames: 'George',
  sex: 1
}, {
  year: 1969,
  month: 6,
  day: 12,
  departementCode: '75',
  city: 'Paris'
}, recipientAddress);
/* */

/*
  Article Montant R2
 */
const amountIndicativeArea = new AmountIndicativeArea({
  year: '2016',
  siret: '12345678912345',
  type: 1
});
const taxCredit = new TaxCredit({AD: 9});
const fixedIncomeProducts = new FixedIncomeProducts({AR: 38});
const incomeSubjectToIncomeTax = new IncomeSubjectToIncomeTax({BU: 38});

const r2 = new R2Amount(amountIndicativeArea, taxCredit, undefined, undefined, undefined, incomeSubjectToIncomeTax, fixedIncomeProducts, undefined, undefined, undefined);
/* */

const rcm = new RCM(d0, {
  fullname: 'Robert Patron',
  phone: '0123456789',
  email: 'robert@patron.com'
});

rcm.addRecipient(r1, r2);

try {
  const ex = rcm.export(true);
}
catch (e) {
  console.log(e)
}

```

## Implemented items

We implemented only what we need:

R3, R4 are not implemented
Only 4 block are implented on R2

Don't hesitate to pull-request new block ;)
