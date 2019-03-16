import React from "react";
import logo from "../assets/logo.png";
import "./AppHeader.css";

const AppHeader = () => {
  return (
    <header className="AppHeader">
      <img src={logo} className="AppHeader__logo" alt="logo" />
      <a
        className="AppHeader__link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
};

export default AppHeader;
