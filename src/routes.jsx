import { lazy } from 'react';

// Lazy load all components for better performance
const NotFound = lazy(() => import('./pages/Notfound'));
const HomePage = lazy(() => import('./pages/home/Index'));
const Feeds = lazy(() => import('./pages/dashboard/feeds/Index'));
const Chats = lazy(() => import('./pages/dashboard/chats/Index'));
const Settings = lazy(() => import('./pages/dashboard/settings/Index'));
const Posts = lazy(() => import('./pages/dashboard/post/Index'));
const PostDetails = lazy(() => import('./pages/dashboard/postDetails/PostDetails.jsx'));
const ChatDetails = lazy(() => import('./pages/dashboard/chatDetails/Index'));
const AffiliateDashboard = lazy(() => import('./pages/dashboard/affiliate/Index'));
const CreateAffiliate = lazy(() => import('./pages/dashboard/affiliate/CreateAffiliate'));
const SubscriptionPlans = lazy(() => import('./pages/subscription/Plans'));
const Profile = lazy(() => import('./pages/dashboard/profile/Index'));
const ReferralHandler = lazy(() => import('./pages/referral/Index'));
const Login = lazy(() => import('./pages//auth/Login'));
const Love = lazy(() => import('./games/LoveWords/Love.jsx'));
const GamesHub = lazy(() => import('./pages/dashboard/games/hub.jsx'));
const GamesHubWrapper = lazy(() => import('./pages/dashboard/games/GamesHubWrapper'));

// Settings sub-pages
const EditProfile = lazy(() => import('./pages/dashboard/settings/EditProfile'));
const AgeRange = lazy(() => import('./pages/dashboard/settings/AgeRange'));
const MaxDistance = lazy(() => import('./pages/dashboard/settings/MaxDistance'));
const Interests = lazy(() => import('./pages/dashboard/settings/Interests'));
const BlockedUsers = lazy(() => import('./pages/dashboard/settings/BlockedUsers'));
const ChangeEmail = lazy(() => import('./pages/dashboard/settings/ChangeEmail'));
const ChangePassword = lazy(() => import('./pages/dashboard/settings/ChangePassword'));

// Protected Route - Lazy loaded
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

export const routes = [
  {
    path: '/',
    element:  <HomePage /> ,
    name: 'Home',
    showInNav: true,
    protected: false,
  },
  {
    path: '/feeds',
    element: <ProtectedRoute> <Feeds /> </ProtectedRoute>  ,
    name: 'Feeds',
    showInNav: true,
    protected: false,
  },
  {
    path: '/post',
    element:  <ProtectedRoute> <Posts /> </ProtectedRoute>  ,
    name: 'post',
    showInNav: true,
    protected: false,
  },
  {
    path: '/settings',
    element:<ProtectedRoute> <Settings /> </ProtectedRoute>  ,
    name: 'settings',
    showInNav: true,
    protected: false,
  },
  {
    path: '/settings/edit-profile',
    element: <ProtectedRoute> <EditProfile /> </ProtectedRoute>,
    name: 'Edit Profile',
    showInNav: false,
    protected: false,
  },
  {
    path: '/settings/age-range',
    element: <ProtectedRoute> <AgeRange /> </ProtectedRoute>,
    name: 'Age Range',
    showInNav: false,
    protected: false,
  },
  {
    path: '/settings/max-distance',
    element: <ProtectedRoute> <MaxDistance /> </ProtectedRoute>,
    name: 'Maximum Distance',
    showInNav: false,
    protected: false,
  },
  {
    path: '/settings/interests',
    element: <ProtectedRoute> <Interests /> </ProtectedRoute>,
    name: 'Interests & Hobbies',
    showInNav: false,
    protected: false,
  },
  {
    path: '/settings/blocked-users',
    element: <ProtectedRoute> <BlockedUsers /> </ProtectedRoute>,
    name: 'Blocked Users',
    showInNav: false,
    protected: false,
  },
  {
    path: '/settings/change-email',
    element: <ProtectedRoute> <ChangeEmail /> </ProtectedRoute>,
    name: 'Change Email',
    showInNav: false,
    protected: false,
  },
  {
    path: '/settings/change-password',
    element: <ProtectedRoute> <ChangePassword /> </ProtectedRoute>,
    name: 'Change Password',
    showInNav: false,
    protected: false,
  },


  {
    path: '/chats',
    element: <ProtectedRoute> <Chats /> </ProtectedRoute> ,
    name: 'settings',
    showInNav: true,
    protected: false,
  },

  {
    path: '/post/:postId',
    element: <ProtectedRoute> <PostDetails /> </ProtectedRoute>  ,
    name: 'Post Details',
    showInNav: false,
    protected: false,
  },

  {
    path: '/games/love',
    element: <Love />,
    name: 'Love In Words',
    showInNav: false, 
    protected: false,  
  },

  {
    path: '/chat/:userId',
    element: <ProtectedRoute> <ChatDetails /> </ProtectedRoute>  ,
    name: 'Chat Details',
    showInNav: false,
    protected: false,
  },

  {
    path: '/affiliate/dashboard',
    element: <ProtectedRoute> <AffiliateDashboard /> </ProtectedRoute> ,
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
    element: <ProtectedRoute> <SubscriptionPlans /> </ProtectedRoute> ,
    name: 'Subscription Plans',
    showInNav: false,
    protected: false,
  },

  {
    path: '/profile',
    element: <ProtectedRoute> <Profile /> </ProtectedRoute> ,
    name: 'Profile',
    showInNav: false,
    protected: false,
  },
  {
    path: '/ref/:id',
    element: <ReferralHandler />,
    name: 'Referral Handler',
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

  {
  path: '/games',
  element: <ProtectedRoute><GamesHubWrapper /></ProtectedRoute>,
  name: 'Games Hub',
  showInNav: false,
  protected: true,
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