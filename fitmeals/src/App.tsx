import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, useLocation,
} from "react-router-dom";
import { SessionContextProvider } from './contexts/SessionContext';
import  Routes  from './Routes';
import './App.less';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
 
  return (

    <Router>
      <ScrollToTop/>
       <SessionContextProvider>
        <Routes />
      </SessionContextProvider>
     
    </Router>
  );
}

export default App;
