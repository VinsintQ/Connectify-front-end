import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./NavBar.css";

const NavBar = ({ user, handleSignout }) => {
  useEffect(() => {
    // Handle scroll event to add 'scrolled' class
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="nav visible">
      {" "}
      {/* Add 'visible' class to show navbar items */}
      <ul className="nav-left">
        {user ? (
          <>
            <li className="list">
              <Link to="/">
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="text">Home</span>
              </Link>
            </li>
            <li className="list">
              <Link to="/profile">
                <span className="icon">
                  <ion-icon name="person-outline"></ion-icon>
                </span>
                <span className="text">Profile</span>
              </Link>
            </li>
            <li className="list">
              <Link to="/chat">
                <span className="icon">
                  <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                </span>
                <span className="text">Chat</span>
              </Link>
            </li>
            <li className="list">
              <Link to="/search">
                <span className="icon">
                  <ion-icon name="search-outline"></ion-icon>
                </span>
                <span className="text">Search</span>
              </Link>
            </li>
            <li className="list">
              <Link to="/Mycompany">
                <span className="icon">
                <ion-icon name="briefcase-outline"></ion-icon>
                </span>
                <span className="text">My Comapany</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="list">
              <Link to="/signin">
                <span className="icon">
                  <ion-icon name="log-in-outline"></ion-icon>
                </span>
                <span className="text">Sign In</span>
              </Link>
            </li>
            <li className="list">
              <Link to="/signup">
                <span className="icon">
                  <ion-icon name="add-outline"></ion-icon>
                </span>
                <span className="text">Sign Up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      {user && (
        <ul className="nav-right">
          <li className="list signout">
            <Link to="#" onClick={handleSignout}>
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="text">Sign Out</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
