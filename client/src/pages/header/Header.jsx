import React from "react";
import './header.css'

function Header() {
  return (
    <div class='header'>
      <nav class="navbar ">
        <div class="container-fluid">
          <a class="navbar-brand" href="image">
            <img
              src="logo192.png"
              alt="Logo"
              width="30"
              height="24"
              class="d-inline-block align-text-top"
            />
            User Management
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Header;
