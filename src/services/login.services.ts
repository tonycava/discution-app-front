import axios from "$lib/utils/axios";

const login = async (username: string, password: string) => {
  return await axios.post(`/auth/login`, {
    username,
    password,
  });
};

export default {
  login
}