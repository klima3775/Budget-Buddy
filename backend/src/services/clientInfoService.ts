import redis from "../config/redisClient.js";

export const saveClientInfoToRedis = async (
  userId: string,
  clientInfo: any
): Promise<void> => {
  try {
    await redis.set(
      `clientInfo:${userId}`,
      JSON.stringify(clientInfo),
      "EX",
      120
    ); // Сохраняем данные на 2 минуты
  } catch (error) {
    console.error("Error saving client info to Redis:", error);
  }
};
