import { ReactNode, useEffect } from "react";
import { axiosClient } from "./context/AxiosClient";
import { useAuthContext } from "./context/AuthContext";

/**
 * 認証ルーティング
 */
const AuthRoute = ({ privateRoute, guestRoute }: {
  /** 要ログインルーティング */
  privateRoute: ReactNode,
  /** 非ログインルーティング */
  guestRoute: ReactNode
}) => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    const abortController = new AbortController();

    if (!auth) {
      axiosClient({
        url: 'session',
        method: 'post',
        signal: abortController.signal,
      })
      .then(res => setAuth(res.data))
      .catch(e => console.error(e.stack));

      return () => abortController.abort()
    }
  }, [
    auth,
    setAuth
  ]);

  return (
    auth
      ? <>{privateRoute}</>
      : <>{guestRoute}</>
  )
}

export {
  AuthRoute,
}
