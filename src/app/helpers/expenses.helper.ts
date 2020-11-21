// import { Currency } from '../model/currency';
// import { Expense } from '../model/expense';
// import { Input } from './../model/input';


// function getEuroValue (inputAmount: number, currency: Currency): number {
//   let newAmount = this.currencyService.convertToEuro(inputAmount, currency);
//   return newAmount;
// }

// export function transformInputToExpense(inputExpense: Input): Expense {
//   const convertedAmount = .getEuroValue(
//     inputExpense.originalAmount.amount,
//     inputExpense.originalAmount.currency
//   );
//   return {
//     ...inputExpense,
//     id: '3',
//     createdAt: new Date(Date.now()),
//     lastModifiedAt: new Date(Date.now()),
//     convertedAmount: {
//       amount: convertedAmount,
//       currency: Currency.EUR,
//     },
//   };
// }