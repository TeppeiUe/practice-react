import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './provider/AuthContextProvider';
import { AxiosClientProvider } from './provider/AxiosClientProvider';
import { DialogProvider } from './provider/DialogProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AxiosClientProvider>
          <DialogProvider>
            <App />
          </DialogProvider>
        </AxiosClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
