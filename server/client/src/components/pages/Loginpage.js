import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from "../../App";

function Loginpage() {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let [error, setError] = useState("");

  const postData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError("Invalid email");
      return;
    }
    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setError(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user",JSON.stringify(data.user));

          dispatch({type:"USER", payload : data.user});
          console.log(data.message);
          history.push("/");
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };
  return (
    <div className="container-fluid stardust-bg">
      {/* <div  >  <img src="images/logo.png" alt="logo" className="logo" /> </div> */}
      <img src="images/star1.png" alt="star" className="star1" />
      <img src="images/star1.png" alt="star" className="star2" />

      <div className="container-fluid  ">
        <div className="row">
          <div className="mt-0 pt-0 col-md-6  d-flex justify-content-start  illustration-div">
            <img
              src="images/planet.png"
              alt="planet"
              className="planet-image"
            />
            <img
              src="images/Saly-6.png"
              alt="person"
              className="person-image img-fluid"
            />
            <img
              src="images/rocket.png"
              alt="rocket"
              className="rocket-image"
            />
            <img
              src="images/camera.png"
              alt="camera"
              className="camera-image"
            />
          </div>

          <div className=" mt-0 pt-0 offset-md-3 col-md-3 col-sm-12 login-register-box">
            <div className="">
            {error!==""? <div className='alert alert-danger' role='alert'>
                {error}
              </div> : "" }
            <div className="form-group text-left  input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-envelope fa-2x input icon"></i>
                  </span>
                </div>

                <input
                  type="email"
                  className="form-control login-register-input"
                  id="email"
                  pattern=".+@gmail.com"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group text-left  input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key fa-2x input icon"></i>
                  </span>
                </div>

                <input
                  type="password"
                  className="form-control login-register-input"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                onClick={() => postData()}
                className="btn btn-lg btn-block login-register-button"
              >
                LOGIN
              </button>

              <div className="forgot-password">
                {" "}
                <a href="#"> Forgot Password </a>{" "}
              </div>
              <p className="signupLink">
                Don't have an account? <Link to=""> SignUp </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
