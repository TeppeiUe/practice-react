import { Routes, Route } from "react-router-dom";
import { TweetListComponent } from "./components/tweet-list-component";
import { UserListComponent } from "./components/user-list-component";
import { LoginComponent } from "./components/login-component";
import { SignupComponent } from "./components/signup-component";
import { GuestRoute, PrivateRoute } from "./AuthRouter";

/**
 * ルーティング
 */
export const AppRouter = () => (
  <Routes>
    <Route
      path="login"
      element={<GuestRoute children={<LoginComponent />} />}
    />
    <Route
      path="signup"
      element={<GuestRoute children={<SignupComponent />} />}
    />
    <Route
      path="users"
      element={<PrivateRoute children={<UserListComponent />} />}
    />
    <Route
      path="tweets"
      element={<PrivateRoute children={<TweetListComponent />} />}
    />
  </Routes>
)
