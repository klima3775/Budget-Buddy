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

    const response = await monoClient.get(
      `/personal/statement/${account}/${from}/${to}`,
      {
        headers: { "X-Token": token },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Помилка отримання виписки");
  }
}
