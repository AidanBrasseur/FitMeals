import React from 'react';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import CheckAuthRoute from './components/CheckAuthRoute';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SavedRecipesPage from './pages/SavedRecipesPage/SavedRecipesPage';
import RecipePage from './pages/RecipePage/RecipePage'
import EditRecipePage from './pages/EditRecipePage/EditRecipePage';

function Routes() {
  

  return (
    <div>
      
      <Switch>
        
        <CheckAuthRoute exact path="/" component={HomePage}/>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <CheckAuthRoute path="/recipe" component={RecipePage}/>
        <ProtectedRoute path='/new-recipe' component={NewRecipePage} />
        <ProtectedRoute path='/admin-panel' component={AdminPage} />
        <CheckAuthRoute path='/profile' component={ProfilePage} />
        <ProtectedRoute path='/saved-recipes' component={SavedRecipesPage} />
        <ProtectedRoute path='/edit-recipe' component={EditRecipePage} />
      </Switch>
     
    </div>
  );
}
export default Routes