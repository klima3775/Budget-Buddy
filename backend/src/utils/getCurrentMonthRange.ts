const getCurrencyMonthRange = () => {
  const now = new Date();

  // Начало месяца: 1-е число текущего месяца, 00:00:00
  const startOfMonth =
    new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000;

  // Конец месяца: последнее число текущего месяца, 23:59:59
  const endOfMonth =
    new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime() /
    1000;
};

export default getCurrencyMonthRange;
