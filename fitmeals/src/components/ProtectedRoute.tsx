import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSessionContext } from "../contexts/SessionContext";


function ProtectedRoute({ component: Component, ...rest } : any) {
  const location = useLocation();
  const [sessionState, setSessionState] = useSessionContext();
  return (
    <Route {...rest}>
      { sessionState.isAuthenticated ?
        <Component />
      :
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default ProtectedRoute;