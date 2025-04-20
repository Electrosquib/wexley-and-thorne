import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <NavLink className="logo" to="/">
        <img src="/img/logo.svg" alt="Wexley and Thorne Logo" />
        <p>Wexley <span>& Thorne Press</span></p>
      </NavLink>

      {/* Hamburger (visible on small screens) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Nav links */}
      <div className={`nav ${menuOpen ? 'nav-open' : ''}`}>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "active" : ""}
        end
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>

      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? "active" : ""}
        onClick={() => setMenuOpen(false)}
      >
        About Us
      </NavLink>

      <NavLink 
        to="/authors" 
        className={({ isActive }) => isActive ? "active" : ""}
        onClick={() => setMenuOpen(false)}
      >
        Our Authors
      </NavLink>

      <NavLink 
        to="/books" 
        className={({ isActive }) => isActive ? "active" : ""}
        onClick={() => setMenuOpen(false)}
      >
        Books
      </NavLink>

      </div>
    </div>
  );
}

export default Navbar;
