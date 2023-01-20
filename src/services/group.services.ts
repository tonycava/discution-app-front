import axios from 'axios';

const getGroupByUserId = (token = '') => {
  return axios.get(`${import.meta.env.VITE_API_URL}/group/all`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  getGroupByUserId
};