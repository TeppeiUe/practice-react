import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./provider/AuthContextProvider";
import { axiosClient } from "./provider/AxiosClientProvider";

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
      .catch(e => {
        if (e?.status === 401) {
          setAuth(null);
        }
      });

      return () => abortController.abort()
    }
  },
  // eslint-disable-next-line
  []);

  return (
    auth
      ? <>{privateRoute}</>
      : <>{guestRoute}</>
  )
}

export {
  AuthRoute,
}
