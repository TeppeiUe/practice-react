import { NavLink } from "react-router-dom";
import { AppRouter } from "./AppRouter";

const App = () => (
  <>
  <AppRouter />
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
