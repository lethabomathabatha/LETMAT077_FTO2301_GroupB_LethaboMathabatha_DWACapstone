import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient } from '@supabase/supabase-js'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Success from './pages/Success.jsx'
import Search from './pages/Search.jsx'
import PodcastDetails from './pages/PodcastDetails.jsx'
import Favourites from './pages/Favourites.jsx'
import Account from './pages/Account.jsx'

const supabaseUrl = import.meta.env.VITE_REACT_APP_PODS_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_PODS_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "success",
    element: <Success />,
  },
  {
    path: "search",
    element: <Search />,
  },
  {
    path: "search/:id",
    element: <PodcastDetails />,
  },
  {
    path: "favourites",
    element: <Favourites />,
  },
  {
    path: "account",
    element: <Account />,
  },
]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);