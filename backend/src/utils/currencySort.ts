const currenciesA = {
  USD: 840,
  EUR: 978,
  UAH: 826,
};

const currencyB = 980;

export const filterRates = (rates: any[]) => {
  return rates.filter(
    (rate: any) =>
      [currenciesA.USD, currenciesA.EUR, currenciesA.UAH].includes(
        rate.currencyCodeA
      ) && rate.currencyCodeB === currencyB
  );
};
