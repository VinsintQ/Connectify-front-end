import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = ({ user, handleSignout }) => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    
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
                  <img
                    className="logo"
                    src="https://res.cloudinary.com/dqqmgoftf/image/upload/v1726078144/c3j9xv8ni8hmrevhgtra.png"
                    alt="Nav bar logo"
                  />
                </span>
              </Link>
            </li>
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
            <li className={`list ${activeLink === "/Mycompany" ? "active" : ""}`}>
              <Link to="/Mycompany" onClick={() => handleLinkClick("/Mycompany")}>
                <span className="icon">
                <ion-icon name="business-outline"></ion-icon>
                </span>
                <span className="text">Company</span>
              </Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      {user && (
        <ul className="nav-right">
          <li className="list signout">
            <Link to="/" onClick={handleSignout}>
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
