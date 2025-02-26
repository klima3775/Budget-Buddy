import User, { IUser } from "../model/user.js";
import fetchClientInfo from "../services/fetchClientInfo.js";
import { saveClientInfoToRedis } from "../services/clientInfoService.js";

const updateClientInfo = async () => {
  try {
    const users: IUser[] = await User.find();
    for (const user of users) {
      const userId = (user._id as unknown as string).toString();

      const clientInfo = await fetchClientInfo(userId);

      await saveClientInfoToRedis(userId, clientInfo);
    }
    console.log("✅ Информация о клиентах обновлена");
  } catch (err) {
    console.error("❌ Ошибка обновления информации о клиентах:", err);
  }
};

const updateInterval = 120000; // 2 минуты

setInterval(updateClientInfo, updateInterval);
