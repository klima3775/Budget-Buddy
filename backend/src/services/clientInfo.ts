import monoClient from "../client/monoClient.js";

export default async function fetchClientInfo() {
  try {
    const response = await monoClient.get("/personal/client-info");
    return response.data;
  } catch (error) {
    throw new Error("Помилка отримання інформації про клієнта");
  }
}
