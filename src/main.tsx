import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Map2 from './Map2';
import { RecoilRoot } from 'recoil';
import Details from './Details';
import './Map2.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Map2/>,
  },
  {
    path: '/details/:id',
    element: <Details/>,
  }
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
    {/* <App /> */}
  </React.StrictMode>
);
