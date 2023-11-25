import { Box } from "@mui/material";
import { AppRouter } from "./AppRouter";
import {
  DrawerHeader,
  HeaderComponent
} from "./components/common/header-component";
import { DialogComponent } from "./components/common/dialog-component";

const App = () => (
  <Box sx={{ display: 'flex' }}>
    <HeaderComponent />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <AppRouter />
    </Box>
    <DialogComponent />
  </Box>
)

export default App;
