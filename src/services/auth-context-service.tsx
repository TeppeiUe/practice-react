import { useState, createContext, Dispatch, SetStateAction, ReactNode, useContext } from "react";
import { UserBase } from "../models/user-params";

interface UseState<T> {
  auth: T,
  setAuth: Dispatch<SetStateAction<T>>
}

const AuthContext = createContext<UseState<UserBase|null>>({
  auth: null,
  setAuth: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode}) => {
  const [auth, setAuth] = useState<UserBase|null>(null);
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext);

export {
  useAuthContext,
  AuthContextProvider,
}