import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IRoute, routes } from './modules/routes';
import PrivateRoute from './components/PrivateRoute';
import { Error404 } from './modules/PageError';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route: IRoute, i: number) => (
          <PrivateRoute
            key={i}
            exact
            path={route.route}
            render={props => <route.module {...props} />}
          />
        ))}
        <Route key="route-error-404" path="" component={Error404} />
        <Route key="route-error-404" path="404" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
