const currencies = {
  USD: 840,
  EUR: 978,
  UAH: 980,
};

export const filterRates = (rates: any[]) => {
  return rates.filter((rate: any) =>
    [currencies.USD, currencies.EUR, currencies.UAH].includes(
      rate.currencyCodeA
    )
  );
};
