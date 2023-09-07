import { ReactNode, useEffect } from "react";
import { useAuthContext } from "./services/auth-context-service";
import { AuthCommunicationService } from "./services/auth-communication-service";

/**
 * 認証ルーティング
 */
const AuthRoute = ({ privateRoute, guestRoute }: { privateRoute: ReactNode, guestRoute: ReactNode }) => {
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
    auth
      ? <>{privateRoute}</>
      : <>{guestRoute}</>
  )
}

export {
  AuthRoute,
}
