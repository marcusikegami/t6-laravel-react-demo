import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './Router.jsx';
import { RouterProvider, Router } from 'react-router-dom';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ContextProvider>
  </React.StrictMode>,
)
