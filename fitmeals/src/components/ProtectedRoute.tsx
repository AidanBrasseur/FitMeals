import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSessionContext } from "../contexts/SessionContext";


function ProtectedRoute({ component: Component, ...rest } : any) {
  const location = useLocation();
  const [sessionState, setSessionState] = useSessionContext();
  const auth = localStorage.getItem('authToken')
  let user = sessionState.user
  if(auth && !user){
    //check thing and set user
    console.log(auth)
    // will need another route for verifying 
    //set user in session
    // let user = 
  }
 

  return (
    <Route {...rest}>
      { user ?
        <Component />
      :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default ProtectedRoute;