import type { AxiosResponse } from 'axios';
import axios from 'axios';

const login = async ({
  username,
  password,
}: { username: string, password: string }): Promise<AxiosResponse<{ access_token: string }>> => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    username,
    password,
  }, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export default {
  login,
};