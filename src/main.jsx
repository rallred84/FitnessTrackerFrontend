import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './components/homepage/homepage';
import Routines from './components/routines/routines';
import MyRoutines from './components/myRoutines/myRoutines';
import Activities from './components/activities/activities';
import Login from './components/login/login';
import SingleRoutine from './components/routines/singleRoutine';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/routines',
        element: <Routines />,
      },
      {
        path: '/routines/:routineId',
        element: <SingleRoutine />,
      },

      {
        path: '/my-routines',
        element: <MyRoutines />,
      },
      {
        path: '/activities',
        element: <Activities />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
