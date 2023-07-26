import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Search from './pages/Search.jsx'
import PodcastDetails from './pages/PodcastDetails.jsx'
import Favourites from './pages/Favourites.jsx'

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
],
  {
    basename: "/"
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
