import monoClient from "../client/monoClient.js";
import User from "../model/user.js";
import { decryptToken } from "../utils/encription.js";

export default async function fetchClientInfo(userId: string) {
  try {
    const user = await User.findById(userId);

    if (!user || !user.token) {
      throw new Error("Користувач не авторизований");
    }

    const token = decryptToken(user.token);

    const response = await monoClient.get("/personal/client-info", {
      headers: {
        "X-Token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Помилка отримання інформації про клієнта");
  }
}
