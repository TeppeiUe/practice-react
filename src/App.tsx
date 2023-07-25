import { Routes, Route, Link, NavLink } from "react-router-dom";
import { Tweets } from "./components/Tweets";
import { Users } from "./components/Users";
import { Login } from "./components/login";
import { SignUp } from "./components/SignUp";

const App = () => (
  <>
    <Routes>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="users" element={<Users />}></Route>
      <Route path="tweets" element={<Tweets />}></Route>
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
