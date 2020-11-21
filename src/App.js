import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Login from './components/login.component';
import Notes from './components/notes.component';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const checkLogin = async () => {
        const token = localStorage.getItem('tokenStore');
        if (token) {
          const verified = await axios.get('/users/verify', {
            headers:{ Authorization: token }
          });
          console.log(verified);
          setIsLogin(verified.data);
          if(verified.data === false) {
            return localStorage.clear();
          }
        }
        else {
          setIsLogin(false);
        }
      }
      checkLogin();
    }

    return () => mounted = false;
  }, []);

  return (
    <Router>
      <div className="App">
        {
          isLogin ? 
          <Notes setIsLogin={setIsLogin}/> : 
          <Login setIsLogin={setIsLogin}/>
        }
      </div>
    </Router>
  );
}

export default App;
