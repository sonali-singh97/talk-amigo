import React, { useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {UserContext} from "../../App";

function Newpassword() {
 
  const history = useHistory();
  const [password, setPassword] = useState("");
  const {token} = useParams();
  let [error, setError] = useState("");

  const postData = () => {
  
    fetch("/new-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
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
    <div className="container-fluid stardust-bg  below-navbar">
      {/* <div  >  <img src="images/logo.png" alt="logo" className="logo" /> </div> */}
      <img src="images/star1.png" alt="star" className="star1" />
      <img src="images/star1.png" alt="star" className="star2" />

      <div className="container-fluid  ">
        <div className="row">
          <div className="mt-0 pt-0 col-md-4  d-flex justify-content-start  reset-illustration-div">
            {/* <img
              src="images/planet.png"
              alt="planet"
              className="planet-image"
            /> */}
            {/* <img
              src="images/Saly-6.png"
              alt="person"
              className="person-image img-fluid"
            /> */}
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

          <div className=" mt-0 pt-8 col-lg-3 col-md-4 offset-sm-3 col-sm-6 login-register-box reset-login-register-box ">
            <div className="">
            {error!==""? <div className='alert alert-danger' role='alert'>
                {error}
              </div> : "" }
           
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
                  placeholder="Enter new password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                onClick={() => postData()}
                className="btn btn-lg btn-block login-register-button  reset-button"
              >
            UPDATE PASSWORD
              </button>

              
              <p className="signupLink">
                Don't have an account? <Link to="/signup"> SignUp </Link>
              </p>
            </div>
          </div>


          <div className="mt-0 pt-0 col-md-4  d-flex justify-content-start  reset-illustration-div">
            <img
              src="images/planet.png"
              alt="planet"
              className="planet-image"
            />
          </div>


        </div>
      </div>
    </div>
  );
}

export default Newpassword;
