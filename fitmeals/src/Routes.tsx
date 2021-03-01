import React from 'react';
import { Switch, Route } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';


function Routes() {
  

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
        <ProtectedRoute path='/new-recipe' component={NewRecipePage} />
        <ProtectedRoute path='/admin-panel' component={AdminPage} />
      </Switch>
      </Switch>
    </div>
  );
}
export default Routes