import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex justify-end items-end">
      <div className="bg-base-100">
        <button className="btn btn-ghost text-xl">
          <Link to={'/crud'}>Crud</Link>
        </button>
        <button onClick={handleLogout} className="btn btn-ghost text-xl">
          {token ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
