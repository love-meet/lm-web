import { lazy } from 'react';

// Lazy load all components for better performance
const NotFound = lazy(() => import('./pages/Notfound'));
const HomePage = lazy(() => import('./pages/home/Index'));
const Feeds = lazy(() => import('./pages/dashboard/feeds/Index'));
const Chats = lazy(() => import('./pages/dashboard/chats/Index'));
const Settings = lazy(() => import('./pages/dashboard/settings/Index'));
const Posts = lazy(() => import('./pages/dashboard/post/Index'));
const PostDetails = lazy(() => import('./pages/dashboard/postDetails/Index'));
const ChatDetails = lazy(() => import('./pages/dashboard/chatDetails/Index'));
const AffiliateDashboard = lazy(() => import('./pages/dashboard/affiliate/Index'));
const CreateAffiliate = lazy(() => import('./pages/dashboard/affiliate/CreateAffiliate'));
const SubscriptionPlans = lazy(() => import('./pages/subscription/Plans'));
const Profile = lazy(() => import('./pages/dashboard/profile/Index'));
const Login = lazy(() => import('./pages//auth/Login'));
const Mines = lazy(() => import('./games/mines/Mines'));


// Protected Route - Lazy loaded
// const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

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
  {
    path: '/post',
    element: <Posts /> ,
    name: 'post',
    showInNav: true,
    protected: false,
  },
  {
    path: '/settings',
    element: <Settings /> ,
    name: 'settings',
    showInNav: true,
    protected: false,
  },
  {
    path: '/chats',
    element: <Chats /> ,
    name: 'settings',
    showInNav: true,
    protected: false,
  },

  {
    path: '/post/:postId',
    element: <PostDetails /> ,
    name: 'Post Details',
    showInNav: false,
    protected: false,
  },

  {
  path: '/games/mines',
  element: <Mines />,
  name: 'Mines',
  showInNav: false, 
  protected: false,  
},


  {
    path: '/chat/:chatId',
    element: <ChatDetails /> ,
    name: 'Chat Details',
    showInNav: false,
    protected: false,
  },

  {
    path: '/affiliate/dashboard',
    element: <AffiliateDashboard />,
    name: 'Affiliate Dashboard',
    showInNav: false,
    protected: false,
  },

  {
    path: '/affiliate/create',
    element: <CreateAffiliate />,
    name: 'Become an Affiliate',
    showInNav: false,
    protected: false,
  },

  {
    path: '/subscription/plans',
    element: <SubscriptionPlans />,
    name: 'Subscription Plans',
    showInNav: false,
    protected: false,
  },

  {
    path: '/profile',
    element: <Profile />,
    name: 'Profile',
    showInNav: false,
    protected: false,
  },
 {
    path: '/login',
    element: <Login />,
    name: 'Login',
    showInNav: false,
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