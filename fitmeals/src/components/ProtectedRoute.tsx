import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { HOST } from "../config";
import { useSessionContext } from "../contexts/SessionContext";
import { User } from "../types";


function ProtectedRoute({ component: Component, ...rest }: any) {
  const location = useLocation();
  const [sessionState, setSessionState] = useSessionContext();
  const auth = localStorage.getItem('authToken')
  let user = sessionState.user
  const [checkComplete, setCheckComplete] = useState(false)
  const [noCheck, setNoCheck] = useState(false)
  const checkLogin = () => {
    if (auth && !user) {
      //check thing and set user
      axios.post(HOST + 'auth/login-authtoken', null, {
        headers: {
          authorization: auth
        }
      }).then(response => {
        // Creating the user and redirecting to the main page
        let res = response.data.user;
        let newUser = {
          id: res.id,
          name: res.fullname,
          email: res.email,
          authToken: res.authToken,
          username: res.username,
          isAdmin: res.isAdmin,
          image: res.image?.url
        } as User;
        user = newUser
        setSessionState({ ...sessionState, user });
        setCheckComplete(true)
      }).catch((error) => {
        setCheckComplete(true)
        console.log(error)
      });
    }
    else {
      setNoCheck(true)
    }
  }
  useEffect(() => {
    checkLogin()
  }, []);

  return (

    <Route {...rest}>
      { user ?
        <Component />
        :
        (checkComplete || noCheck) && <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    </Route>
  );
};

export default ProtectedRoute;