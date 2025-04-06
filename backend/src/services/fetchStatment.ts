import monoClient from "../client/monoClient.js";
import User from "../model/user.js";
import { decryptToken } from "../utils/encription.js";

export default async function fetchStatement(
  userId: string,
  account: string,
  from: number,
  to: number
) {
  try {
    const user = await User.findById(userId);

    if (!user || !user.token) {
      throw new Error("Користувач не авторизований");
    }

    const token = decryptToken(user.token);

    console.log(
      `➡️ Monobank API request: /personal/statement/${account}/${from}/${to}`
    );
    console.log(`🕒 From (unix): ${from}, To (unix): ${to}`);
    console.log(`📅 From (date): ${new Date(from * 1000).toISOString()}`);
    console.log(`📅 To (date): ${new Date(to * 1000).toISOString()}`);
    const response = await monoClient.get(
      `/personal/statement/${account}/${from}/${to}`,
      {
        headers: { "X-Token": token },
      }
    );

    console.log("Monobank Response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Помилка отримання виписки");
  }
}
