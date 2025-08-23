import { lazy } from 'react';
import { Navigate } from 'react-router';

// Lazy load all components for better performance
const NotFound = lazy(() => import('./pages/Notfound'));
const HomePage = lazy(() => import('./pages/home/Index'));
const Feeds = lazy(() => import('./pages/dashboard/feeds/Index'));


// Protected Route - Lazy loaded
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

export const routes = [
  {
    path: '/',
    element: <HomePage /> ,
    name: 'Home',
    showInNav: true,
    protected: false,
  },
  {
    path: '/feeds',
    element: <Feeds /> ,
    name: 'Feeds',
    showInNav: true,
    protected: false,
  },


  // {
  //   path: '/transactions',
  //   element: <ProtectedRoute><Transactions /></ProtectedRoute>,
  //   name: 'Transactions',
  //   showInNav: true,
  //   protected: true,
  //   children: [
  //     {
  //       index: true,
  //       element: <DepositsTable />,
  //     },
 
  //   ],
  // },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
    showInNav: false,
    protected: false,
  },
];