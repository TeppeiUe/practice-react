import axios from "axios";

/**
 * Axiosインスタンス
 */
export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
