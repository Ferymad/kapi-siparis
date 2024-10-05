import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white hover:text-blue-200">Home</Link></li>
        <li><Link to="/dashboard" className="text-white hover:text-blue-200">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
