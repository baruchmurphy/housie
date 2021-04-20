import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { PrivateRoute } from './privateroute'
import Register from './views/auth/register';
import Login from './views/auth/login';
import Forgot from './views/auth/forgot';
import Home from './layouts/Home';
import LoadingScreen from './components/LoadingScreen';
import { PrivateRoute } from './privateroute';

// interface RouteProps {
//   exact?: boolean;
//   path?: string | string[];
//   component?: React.FC<any>;
//   layout?: React.FC<any>;
//   guard?: React.FC<any>;
//   routes?: RouteProps[];
// }

// const routeConfig: RouteProps[] = [
//   // {
//   //   exact: true,
//   //   path: '/home'
//   // },
//   // {
//   //   exact: true,
//   //   path: '/login'
//   // },
//   {
//     exact: true,
//     path: '/register',
//     component: React.lazy(() => import('./views/auth/register'))
//   },
//   // {
//   //   exact: true,
//   //   path: '/',
//   //   component: () => <Redirect to="/register" />
//   // }
// ];

function Routes() {
  return (
    <Switch>
      <Route exact path='/loading' component={LoadingScreen} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot" component={Forgot} />
      <PrivateRoute exact path='/home' component={Home} />
      <PrivateRoute exact path='/home/settings' component={Home} />
      <PrivateRoute exact path='/home/finance' component={Home} />
      <PrivateRoute exact path='/home/planning' component={Home} />
      <PrivateRoute exact path='/home/chores' component={Home} />
      <PrivateRoute exact path='/home/lists' component={Home} />
      <PrivateRoute exact path='/home/lists/grocerylist' component={Home} />
    </Switch>
  );
}

export default Routes;