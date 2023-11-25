import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext
} from "react";
import { UserBase } from "../models/user-params";

interface UseState<T> {
  /** ログインユーザ情報 */
  auth: T,
  /** ログインユーザ情報の設定 */
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
