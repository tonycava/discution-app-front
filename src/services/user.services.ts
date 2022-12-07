import axios, { type AxiosResponse } from 'axios';

const getUser = async (jwtToken = ''): Promise<AxiosResponse<{ id: string, createdAt: Date, username: string }>> => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
  });
};


const isAuthorized = async (jwtToken = ''): Promise<AxiosResponse<{ message: string }>> => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/users/is-ok`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
  });
};

export default {
  getUser,
  isAuthorized,
};