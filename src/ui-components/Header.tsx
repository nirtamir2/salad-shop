import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <>
      <div className="Header__placeholder" />
      <header className="Header">
        <h1>
          <NavLink to="/" className="Header__text">
            Store
          </NavLink>
        </h1>
      </header>
    </>
  );
}

export default Header;
