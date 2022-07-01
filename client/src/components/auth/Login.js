import React, { useState, useContext } from "react";
import axios from "axios";
import { Form } from "antd";
import { AuthContext } from "../../helpers/AuthContext";
//Redirect
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { email: email, password: password };
    axios.post("/api/login", data).then((response) => {
      //if there is error
      if (response.data.error) {
        alert(response.data.error); //show alert box
        setAuthState(true); // changed setAuthState which is in located components/Header.js
        // save "accessToken" to sessionStorage
      } else {
        //localStorage.setItem("loginId", loginId) :
        //localStorage.getItem("loginId") :
        //const savedLoginId = localStorage.getItem("accessToken");

        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("email", response.data.email);

        document.location.href = "/"; //page refresh.
        //navigate("/"); //redirec to /serviceform //page refresh problem.
      }
      console.log(response.data);
    });
  };

  return (
    <div>
      <section className="subBanner bg-secondary py-3">
        <div className="container flex">
          <div className="subBannerdes">
            <h2 className="md b800">LOGIN</h2>
          </div>
        </div>
      </section>

      <section className="mainAbout my-5">
        <div className="container">
          <div className="showcase-form card">
            <h2>Login</h2>
            <p className="fontColorRed b800">
              **Please refresh this page, after loginIn
            </p>
            <Form>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button onClick={login}> Login </button>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
