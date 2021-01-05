import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from "../../App";

function Resetpage() {
  
  const history = useHistory();
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
    fetch("/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setError(data.error);
        } else {
            
         console.log(data.message);
          history.push("/login");
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };
  return (
    <div className="container-fluid stardust-bg">
  
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
         
              

               
              </div>

              <button
                onClick={() => postData()}
                className="btn btn-lg btn-block login-register-button"
              >
                RESET PASSWORD
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
   
  );
}

export default Resetpage;
