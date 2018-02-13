# About versions

## 0.1.0

- R1 and R2 now uses object in constructors to simplify the addition of new blocks.
No backward compatibility.
- Adding implementation of 2018 `R2Amount.js.crowdfundingProducts`, us the new type `{CrowdfundingProducts}`.


## 0.1.0-beta.4

Ready with following implementation:

D0 Blocks (issuer)
- issuerIndicativeArea `{}`
- issuerAddress

R1 blocks (recipient)
- recipientIndicativeArea `{RecipientIndicativeArea}`
- recipientType `{Object}`
- recipient `{Object}`
- birth `{Object}`
- recipientAddress `{RecipientAddress}`

R2 blocks (amount)
- amountIndicativeArea `{AmountIndicativeArea}`
- taxCredit `{TaxCredit}`
- incomeSubjectToIncomeTax `{IncomeSubjectToIncomeTax}`
- fixedIncomeProducts `{FixedIncomeProducts}`
- fees `{Fees}`
