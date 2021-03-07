import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SavedRecipesPage from './pages/SavedRecipesPage/SavedRecipesPage';

function Routes() {
  

  return (
    <div>
      
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
        <ProtectedRoute path='/profile' component={ProfilePage} />
        <ProtectedRoute path='/saved-recipes' component={SavedRecipesPage} />
      </Switch>
     
    </div>
  );
}
export default Routes