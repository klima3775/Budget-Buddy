import axios from "axios";
import monoClient from "../client/monoClient.js";
import { filterRates } from "../utils/currencySort.js";

let cacheRates: any = null;
let lastFetchTime = 0;
const cacheDuration = 5 * 60 * 1000;

export default async function getCurrencyRates() {
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
  } catch (error) {
    console.log("Помилка отримання курсу валют", error);
    throw new Error("Помилка отримання курсу валют");
  }
}
