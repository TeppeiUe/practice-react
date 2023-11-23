import axios from "axios";

/**
 * Axiosインスタンス
 */
export const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
