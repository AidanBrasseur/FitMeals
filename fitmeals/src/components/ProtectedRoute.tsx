import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useSessionContext } from '../contexts/SessionContext';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPathOnAuthentication: string;
  setRedirectPathOnAuthentication: (path: string) => void;
}

function ProtectedRoute(props : ProtectedRouteProps){
  const currentLocation = useLocation();
  const [sessionContext, updateSessionContext] = useSessionContext();

  React.useEffect(() => {
    updateSessionContext({...sessionContext, redirectPathOnAuthentication: currentLocation.pathname});
  }, []);
  let redirectPath = props.redirectPathOnAuthentication;
  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;

