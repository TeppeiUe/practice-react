import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext
} from "react";
import { UserBase } from "../models/user-params";

interface UseState<T> {
  auth: T,
  setAuth: Dispatch<SetStateAction<T>>
}

/**
 * ユーザ情報コンテクスト
 */
export const AuthContext = createContext<UseState<UserBase | null>>({
  auth: null,
  setAuth: () => {},
});

/**
 * ユーザ情報useContext
 */
export const useAuthContext = () => useContext(AuthContext);
