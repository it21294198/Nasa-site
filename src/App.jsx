import React from 'react';
import { useContext } from 'react';
import { UserContext } from './context/use_context.js';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './context/store';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './routes/Home.jsx';
import Earth from './routes/Earth.jsx';
import Auth from './routes/Auth.jsx';
import Error from './routes/Error.jsx';
import Mars from './routes/Mars.jsx';
import Pod from './routes/Pod.jsx';
import UserProvider from './context/user_provider.jsx';

const ProtectedRoute = ({ children }) => {
  const  { state, setState }  = useContext(UserContext);
  return state !== '' ? children : window.location.replace("/auth");
};

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App(){
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement:<Error/>
  },
  {
    path: "/auth",
    element: <Auth/>,
    errorElement:<Error/>
  },
  {
    path: "/pod",
    element:<Pod/>,
    errorElement:<Error/>
  },
  {
    path: "/earth",
    element:
        <ProtectedRoute>
          <Earth/>
        </ProtectedRoute>,
    errorElement:<Error/>
  },
  {
    path: "/mars",
    element:
        <ProtectedRoute>
          <Mars/>
        </ProtectedRoute>,
    errorElement:<Error/>
  },
]);

 return(<>
    <UserProvider>
      <Provider store={store}>
        <Header/>
        <RouterProvider router={router} />
        <Footer/>
      </Provider>
    </UserProvider>
 </>) 

}

export default App;