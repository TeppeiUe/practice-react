import { Routes, Route, NavLink } from "react-router-dom";
import { TweetListComponent } from "./components/tweet-list-component";
import { UserListComponent } from "./components/user-list-component";
import { LoginComponent } from "./components/login-component";
import { SignupComponent } from "./components/signup-component";

const App = () => (
  <>
    <Routes>
      <Route path="login" element={<LoginComponent />}></Route>
      <Route path="signup" element={<SignupComponent />}></Route>
      <Route path="users" element={<UserListComponent />}></Route>
      <Route path="tweets" element={<TweetListComponent />}></Route>
    </Routes>
    <ul>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? { color: 'blue' } : undefined }
          to="login"
        >
          login
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? { color: 'blue' } : undefined }
          to="signup"
        >
          signup
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? { color: 'blue' } : undefined }
          to="users"
        >
          users
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? { color: 'blue' } : undefined }
          to="tweets">
          tweets
        </NavLink>
      </li>
    </ul>
  </>
  
)

export default App;
