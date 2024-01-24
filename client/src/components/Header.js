import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={headerStyle}>
      <div style={centerContainerStyle}>
        <img
          src="/logo.png"
          alt="Restaurant Logo"
          style={logoStyle}
        />
        <h1 style={titleStyle}>
          <Link to="/" style={linkStyle}>
            Restaurant Pizzas
          </Link>
        </h1>
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  padding: "1rem",
  textAlign: "center",
};

const centerContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoStyle = {
  width: "50px", // Adjust the width as needed
  height: "50px", // Adjust the height as needed
  marginRight: "10px", // Adjust the margin as needed
};

const titleStyle = {
  margin: 0,
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default Header;
