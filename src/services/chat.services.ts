import axios, { type AxiosResponse } from 'axios';
import type { Message } from '@models/User';
import type { Limit } from '@models/Limit';

const getChats = async ({ start, end }: Limit<number>, groupId: string): Promise<AxiosResponse<Message[]>> => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/chat/?start=${start}&end=${end}&groupId=${groupId}`, {
    withCredentials: true,
  });
};

export default {
  getChats
};