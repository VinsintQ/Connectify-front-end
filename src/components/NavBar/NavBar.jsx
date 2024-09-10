import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = ({ user, handleSignout }) => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation(); // To get the current route path

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

  useEffect(() => {
    // Set the active link based on the current route
    setActiveLink(location.pathname);
  }, [location]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="nav visible">
      <ul className="nav-left">
        {user ? (
          <>
            <li className={`list ${activeLink === "/" ? "active" : ""}`}>
              <Link to="/" onClick={() => handleLinkClick("/")}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="text">Home</span>
              </Link>
            </li>
            <li className={`list ${activeLink === "/profile" ? "active" : ""}`}>
              <Link to="/profile" onClick={() => handleLinkClick("/profile")}>
                <span className="icon">
                  <ion-icon name="person-outline"></ion-icon>
                </span>
                <span className="text">Profile</span>
              </Link>
            </li>
            <li className={`list ${activeLink === "/chat" ? "active" : ""}`}>
              <Link to="/chat" onClick={() => handleLinkClick("/chat")}>
                <span className="icon">
                  <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                </span>
                <span className="text">Chat</span>
              </Link>
            </li>
            <li className={`list ${activeLink === "/search" ? "active" : ""}`}>
              <Link to="/search" onClick={() => handleLinkClick("/search")}>
                <span className="icon">
                  <ion-icon name="search-outline"></ion-icon>
                </span>
                <span className="text">Search</span>
              </Link>
            </li>
            <li
              className={`list ${activeLink === "/Mycompany" ? "active" : ""}`}
            >
              <Link
                to="/Mycompany"
                onClick={() => handleLinkClick("/Mycompany")}
              >
                <span className="icon">
                  <ion-icon name="briefcase-outline"></ion-icon>
                </span>
                <span className="text">My Company</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            
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
