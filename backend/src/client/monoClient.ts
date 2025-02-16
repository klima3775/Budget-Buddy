import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const monoClient = axios.create({
  baseURL: "https://api.monobank.ua",
  timeout: 5000,
});

export default monoClient;
