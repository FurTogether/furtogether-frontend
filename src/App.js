import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useAuth } from './hooks/use-auth';
import { Navbar, PhotoAlbum } from './components/organisms';
import { Registration, Home, Profile, Map } from './components/pages';
import { ProfileProvider } from './contexts/profile-context';
import { ProfileTab, Routines } from './components/pages';

import theme from './components/theme';
import { AvatarProvider } from './contexts/navbar-context';

const routes = [
  {
    // path: '/login',
    path: '/signin',
    element: <Registration />,
  },
  {
    path: '/walk',
    element: <Map />,
  },
  {
    path: '/routines',
    element: (
      <ProfileProvider>
        <Routines />
      </ProfileProvider>
    ),
  },
];

const authenticatedRoutes = [
  {
    path: '/profile',
    element: (
      <ProfileProvider>
        <ProfileTab />
      </ProfileProvider>
    ),
  },
  // {
  //   path: '/addstudent',
  //   element: <AddStudent />,
  // },
  //   {
  //   path: '/attendance',
  //   element: <Attendance />,
  // },
];

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log('isAuthenticated: ', isAuthenticated);
  if (!isAuthenticated) {
    // write path of sign-in page here instead of '/'
    return <Navigate to='/signin' state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={null}>
        <AvatarProvider>
          <Navbar />
        <Router basename='/'>
          <Routes>
            {routes.map((route) => (
              <Route key={route} path={route.path} element={route.element}></Route>
              ))}
            {authenticatedRoutes.map((route) => (
              <Route
              key={route}
              path={route.path}
              exact
              element={<RequireAuth>{route.element}</RequireAuth>}
              />
              ))}
          </Routes>
        </Router>
        </AvatarProvider>
      </React.Suspense>
    </ChakraProvider>
  );
}

export default App;
