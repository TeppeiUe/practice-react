import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./services/auth-context-service";
import { AuthCommunicationService } from "./services/auth-communication-service";
import { Navigate } from "react-router-dom";

/**
 * 要ログインルーティング（未ログインの場合ログイン画面へ遷移）
 */
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    if (!auth) {
      const authCommunicationService = new AuthCommunicationService();
      authCommunicationService.session()
      .then(res => setAuth(res))
      .catch(e => {
        if (e?.status === 401) {
          setAuth(null);
        }
      });

      // cancel the request
      return () => authCommunicationService.abort()
    }
  },
  // eslint-disable-next-line
  []);

  return (
    auth ?
    <>{children}</> :
    <Navigate to="/login" />
  )
}

/**
 * 未ログインルーティング（ログイン済の場合ツイート画面に遷移）
 */
const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    if (!auth) {
      const authCommunicationService = new AuthCommunicationService();
      authCommunicationService.session()
      .then(res => setAuth(res))
      .catch(e => {
        if (e?.status === 401) {
          setAuth(null);
        }
      });

      // cancel the request
      return () => authCommunicationService.abort()
    }
  },
  // eslint-disable-next-line
  []);

  return (
    auth ?
    <Navigate to="/tweets" /> :
    <>{children}</>
  ) 
}

export {
  PrivateRoute,
  GuestRoute,
}
