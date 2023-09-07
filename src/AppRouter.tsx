import { Routes, Route, Navigate } from "react-router-dom";
import { TweetListComponent } from "./components/tweet-list-component";
import { UserListComponent } from "./components/user-list-component";
import { LoginComponent } from "./components/login-component";
import { SignupComponent } from "./components/signup-component";
import { AuthRoute } from "./AuthRouter";

/**
 * ルーティング
 */
export const AppRouter = () => (
  <AuthRoute
    privateRoute={
      <Routes>
        <Route
          path="users"
          element={<UserListComponent />}
        />
        <Route
          path="tweets"
          element={<TweetListComponent />}
        />
        <Route
          path="*"
          element={<Navigate to="/tweets" />}
        />
      </Routes>
    }
    guestRoute={
      <Routes>
        <Route
          path="login"
          element={<LoginComponent />}
        />
        <Route
          path="signup"
          element={<SignupComponent />}
        />
        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    }
  />
)
