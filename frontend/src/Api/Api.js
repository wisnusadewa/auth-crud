import axios from 'axios';

const headers = {
  Accept: ['application/json', 'text/plain'],
};
// let config = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   },
// };

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers,
});

export default api;
