import type { AxiosResponse } from "axios";
import axios from "axios";

const login = async ({
  username,
  password
}: { username: string, password: string }): Promise<AxiosResponse<{ access_token: string }>> => {
  return await axios.post("/auth/login", {
    username,
    password
  });
};

const getUser = async (): Promise<AxiosResponse<{ id: string, createdAt: Date, username: string }>> => {
  return await axios.get(`/users/me`);
};

export default {
  login,
  getUser
};