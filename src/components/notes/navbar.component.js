import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({setIsLogin}) {

  const logoutSubmit = () =>{
    localStorage.clear();
    setIsLogin(false)
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">NoteSaver</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="navbar-item"><Link to="/create" className="nav-link">Create Note</Link></li>
        <li onClick={logoutSubmit} className="navbar-item"><Link to="/" className="nav-link">Log Out</Link></li>
      </ul>
      </div>
    </nav>
  );
}