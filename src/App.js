import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
// import routes from './Routes';
import { ChakraProvider } from '@chakra-ui/react';
import { useAuth } from './hooks/use-auth';
import { Navbar } from './components/organisms';
import { Registration, Home } from './components/pages';
import { Profile } from './components/pages/user/Profile';

const routes = [
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  {
    // path: '/login',
    path: '/',
    element: <Registration />,
  },
];

const authenticatedRoutes = [
  {
    path: '/profile',
    element: (
      <>
        <Navbar />
        <RequireAuth>{<Profile />}</RequireAuth>
      </>
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
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <ChakraProvider>
      <React.Suspense fallback={null}>
        <Navbar />
        <Router basename='/'>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route}
                path={route.path}
                element={route.element}
              ></Route>
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
      </React.Suspense>
    </ChakraProvider>
  );
}

export default App;
