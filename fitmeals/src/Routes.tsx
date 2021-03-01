import React from 'react';
import { Switch, Route } from 'react-router';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import { useSessionContext } from './contexts/SessionContext';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';


function Routes() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPathOnAuthentication = (path: string) => {
    updateSessionContext({...sessionContext, redirectPathOnAuthentication: path});
  }

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPathOnAuthentication: sessionContext.redirectPathOnAuthentication || '',
    setRedirectPathOnAuthentication
  };

  return (
    <div>
      <Switch>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <ProtectedRoute {...defaultProtectedRouteProps} path='/new-recipe' component={NewRecipePage} />
      </Switch>
      </Switch>
    </div>
  );
}
export default Routes