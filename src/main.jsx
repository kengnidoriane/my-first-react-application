import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/dashboard/Dashboard.jsx';
import Connexion from './Pages/connexion/Connexion.jsx';
import Inscription from './Pages/inscription/inscription.jsx'
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// initialisation du query client 
const queryClient = new QueryClient();

// creation de l'objet browser router

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: '/connexion',
    element: <Connexion/>
  },
  {
    path: '/inscription',
    element: <Inscription/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider>
      <Toaster/>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
      

  </StrictMode>,
)
