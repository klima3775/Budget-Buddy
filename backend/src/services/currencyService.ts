import monoClient from "../client/monoClient.js";
import { filterRates } from "../utils/currencySort.js";

let cacheRates: any = null;
let lastFetchTime = 0;
const cacheDuration = parseInt(process.env.CACHE_DURATION || "300000", 10);

async function fetchCurrencyRates() {
  const now = new Date();

  if (cacheRates && lastFetchTime + cacheDuration > now.getTime()) {
    return cacheRates;
  }

  try {
    const response = await monoClient.get("/bank/currency");
    const rates = response.data;

    const filteredRates = filterRates(rates);

    cacheRates = filteredRates;
    lastFetchTime = now.getTime();
    return filteredRates;
  } catch (error) {
    throw new Error("Помилка отримання курсу валют");
  }
}

export default async function getCurrencyRates() {
  return await fetchCurrencyRates();
}

// Automatically update currency rates at regular intervals
setInterval(fetchCurrencyRates, cacheDuration);
