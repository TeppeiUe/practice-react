import { useState, ReactNode } from "react";
import { UserBase } from "../models/user-params";
import { AuthContext } from "../context/AuthContext";

/**
 * ユーザ情報コンテクストプロバイダー
 */
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<UserBase | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
