import { Box } from "@mui/material";
import { AppRouter } from "./AppRouter";
import {
  DrawerHeader,
  HeaderComponent
} from "./components/common/header-component";
import { CommunicationComponent } from "./components/common/communication-component";

const App = () => (
  <Box sx={{ display: 'flex' }}>
    <HeaderComponent />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <AppRouter />
    </Box>
    <CommunicationComponent />
  </Box>
)

export default App;
