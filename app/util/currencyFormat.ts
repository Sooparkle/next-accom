const CURRENCY_FORMATTER = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',

});
export const formatCurrency = (number : number) :string =>{ return CURRENCY_FORMATTER.format(number)}