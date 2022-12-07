import axios, { type AxiosResponse } from "axios";

const register = async ({
  username,
  password
}: { username: string, password: string }): Promise<AxiosResponse<{ access_token: string }>> => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
    username,
    password
  });
};

export default {
  register,
};