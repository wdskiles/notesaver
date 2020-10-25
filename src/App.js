import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Login from './components/login.component';
import Notes from './components/notes.component';

import Navbar from "./components/navbar.component"
import CreateUser from "./components/create-user.component";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers:{ Authorization: token}
        });
        console.log(verified);
        setIsLogin(verified.data);
        if(verified.data == false)
          return localStorage.clear();
      }
      else {
        setIsLogin(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <Router>
      <div className="App">
        {
          isLogin ? 
          <Notes /> : 
          <Login setIsLogin={setIsLogin}/>
        }
      </div>
    </Router>
  );
}

export default App;
