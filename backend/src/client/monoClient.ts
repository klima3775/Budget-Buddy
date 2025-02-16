import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const monoClient = axios.create({
  baseURL: process.env.MONO_API_URL,
  timeout: 5000,
});

export default monoClient;
