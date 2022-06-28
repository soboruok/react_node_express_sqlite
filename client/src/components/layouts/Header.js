import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";

const Header = ({ branding }) => {
  //token email isAdmin
  const [authState, setAuthState] = useState({
    email: "",
    isAdmin: 0,
    status: false,
  });

  //token email isAdmin
  //We use useEffect, it helps to excute only once using []
  useEffect(() => {
    axios
      .get("/api/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false }); //Change only status from exist things.
        } else {
          setAuthState({
            email: response.data.email,
            isAdmin: response.data.isAdmin,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("email");
    setAuthState({ accessToken: "", email: "", isAdmin: "", status: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div>
        <div className="topNav">
          <ul>
            <li>
              <span className="px-1 ssm b600"> {authState.email}</span>
            </li>
            <li>
              <Link to="/serviceform">Add Service</Link>
            </li>
            {/* if not logged in */}
            {!authState.status && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            <li>
              {authState.status && (
                <Link to="#" onClick={logout}>
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className="navbar">
          <div className="container ">
            <nav className="flex">
              <h1>
                <Link to="/index" className="b800" style={{ color: "white" }}>
                  {branding}
                </Link>
              </h1>
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/team">OurTeam</Link>
                </li>
                <li>
                  <Link to="/feedbacks">Feedback</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

// We can set default props for a component if nothing is passed through.
Header.defaultProps = {
  branding: "BOB",
};
export default Header;
