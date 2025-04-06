import redis from "../config/redisClient.js";
import fetchStatement from "./fetchStatment.js"; // Предполагаю, что вы имели в виду fetchStatement, а не fetchStatment
import Transaction from "../model/Transaction.js";
import dotenv from "dotenv";

dotenv.config();

const UPDATE_INTERVAL = 3 * 60 * 1000; // 3 минуты
const MAX_CACHED_USERS = parseInt(process.env.MAX_CACHED_USERS || "1000", 10);

interface CacheEntry {
  interval: NodeJS.Timeout;
}

const updateIntervals: { [key: string]: CacheEntry } = {};

// Обновление данных в MongoDB и синхронизация с Redis
const updateTransactions = async (userId: string, account: string) => {
  try {
    const now = new Date();
    const startOfMonth =
      new Date(now.getFullYear(), now.getMonth(), 1).getTime() / 1000; // Начало месяца в секундах

    const endOfMonth = new Date();
    const redisKey = `transactions:${userId}:${account}`;

    // Получаем новые данные из API
    const newTransactions = await fetchStatement(
      userId,
      account,
      oneMonthAgo,
      now
    );

    // Получаем существующие ID транзакций из MongoDB
    const currentIds = await Transaction.find({ userId, account })
      .distinct("id")
      .lean();

    // Фильтруем только новые транзакции
    const transactionsToAdd = newTransactions.filter(
      (t: any) => !currentIds.includes(t.id)
    );

    // Добавляем новые транзакции в MongoDB
    if (transactionsToAdd.length > 0) {
      await Transaction.insertMany(
        transactionsToAdd.map((t: any) => ({ ...t, userId, account }))
      );
      console.log(
        `Added ${transactionsToAdd.length} new transactions to MongoDB for ${userId}:${account}`
      );
    }

    // Получаем актуальные данные из MongoDB за период
    const allTransactions = await Transaction.find({
      userId,
      account,
      time: { $gte: oneMonthAgo },
    }).lean();

    // Синхронизируем Redis
    await redis.setex(redisKey, 300, JSON.stringify(allTransactions));
    console.log("`Updated Redis cache for ${userId}:${account}`);");
  } catch (error) {
    console.error(
      `Error updating transactions for ${userId}:${account}:`,
      error
    );
  }
};

// Получение данных для фронтенда
export const getTransactionsForUser = async (
  userId: string,
  account: string
) => {
  const redisKey = `transactions:${userId}:${account}`;
  const cachedDataRaw = await redis.get(redisKey); // Может быть string | null

  let cachedData: string | null = cachedDataRaw; // Явно указываем тип

  if (!cachedData) {
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - 2682000;

    // Проверяем MongoDB
    const transactions = await Transaction.find({
      userId,
      account,
      time: { $gte: oneMonthAgo },
    }).lean();

    if (transactions.length > 0) {
      cachedData = JSON.stringify(transactions);
      await redis.setex(redisKey, 300, cachedData);
    } else {
      // Если данных нет, загружаем из API и сохраняем
      await updateTransactions(userId, account);
      cachedData = await redis.get(redisKey); // Повторно получаем из Redis
    }

    // Запускаем автоматическое обновление
    startUpdateForUser(userId, account);
  }

  // Проверяем, что cachedData не null перед парсингом
  if (!cachedData) {
    throw new Error("Failed to retrieve transactions data");
  }

  return JSON.parse(cachedData);
};

// Запуск автоматического обновления
const startUpdateForUser = (userId: string, account: string) => {
  const intervalKey = `${userId}:${account}`;
  if (updateIntervals[intervalKey]) {
    return; // Уже запущено
  }

  if (Object.keys(updateIntervals).length >= MAX_CACHED_USERS) {
    console.log("Достигнут лимит активных обновлений");
    return;
  }

  const interval = setInterval(() => {
    updateTransactions(userId, account);
  }, UPDATE_INTERVAL);

  updateIntervals[intervalKey] = { interval };

  // Первое обновление сразу
  updateTransactions(userId, account);
};

// Очистка интервалов при остановке
process.on("SIGTERM", () => {
  Object.values(updateIntervals).forEach((entry) =>
    clearInterval(entry.interval)
  );
  console.log("All update intervals cleared");
});
