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

export default {
  login,
};