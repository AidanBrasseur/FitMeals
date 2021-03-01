import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { SessionContextProvider } from './contexts/SessionContext';
import  Routes  from './Routes';
import './App.less';

function App() {
 
  return (

    <Router>
       <SessionContextProvider>
        <Routes />
      </SessionContextProvider>
    </Router>
  );
}

export default App;
