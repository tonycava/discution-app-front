import axios, { type AxiosResponse } from "axios";

const getUser = async (): Promise<AxiosResponse<{ id: string, createdAt: Date, username: string }>> => {
  return await axios.get(`/users/me`);
};

export default {
  getUser
};