import { Route, RouteProps } from 'react-router-dom';
import React from 'react';

interface IPrivateRouteProps extends RouteProps {
  authenticate?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  authenticate = false,
  ...rest
}) => {
  return <Route {...rest} component={Component} />;
};

export default PrivateRoute;
