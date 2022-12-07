import axios from "axios";
import type { Message } from "@models//Message";

const getChats = async (): Promise<Message[]> => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/chat`, {
    withCredentials: true
  });
};

export default {
  getChats
};