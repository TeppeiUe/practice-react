import { Box } from "@mui/material";
import { AppRouter } from "./AppRouter";
import {
  DrawerHeader,
  HeaderComponent
} from "./components/common/header-component";
import { BrowserRouter } from "react-router-dom";
import { AxiosClientProvider } from "./provider/AxiosClientProvider";
import { DialogComponent } from "./components/common/dialog-component";

const App = () => (
  <>
    <BrowserRouter basename={ import.meta.env.VITE_CONTEXT_PATH || '' }>
      <AxiosClientProvider>
        <Box sx={{ display: 'flex' }}>
          <HeaderComponent />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <AppRouter />
          </Box>
        </Box>
      </AxiosClientProvider>
    </BrowserRouter>
    <DialogComponent />
  </>
)

export default App;
