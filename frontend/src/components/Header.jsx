import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import './Header.css'

export const Header = () => {
  const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    setIsLoggedIn(false);
    navigate("/"); // redirect home
  };
  return (
    <>
      <nav className="header">
        <a
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        >
          <img
            src="/logo.png"
            className="logo-img"
            alt="AssinMe"
          />
          <span>AssinMe</span>
        </a>
        
        {/* <button onClick={() => navigate('/login')} className='button-header'>
          Login
        </button> */}

        
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="button-header"
          >
            Login
          </button>
        ) : (
          <button onClick={handleLogout} className="button-header">
            Logout
          </button>
        )}



      </nav>

    </>
  )
}
