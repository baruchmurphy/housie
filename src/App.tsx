import React from 'react';
import Routes from './routes';
import './App.css';
import { AuthProvider} from '../src/contexts/AuthContext';
import {BrowserRouter as Router } from "react-router-dom";




function App() {
  return (
      <div className="App">
        <Router>
          <AuthProvider >
            <Routes />
          </AuthProvider>
        </Router>
      </div>

  );
}

export default App;
