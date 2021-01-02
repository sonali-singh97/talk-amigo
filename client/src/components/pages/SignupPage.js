import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function SignupPage() {
  const history = useHistory();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState(undefined);
  let [error, setError] = useState("");

  useEffect(() => {
    uploadFields();
  }, [url]);

  const uploadImg = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "talk-amigo");

    fetch("https://api.cloudinary.com/v1_1/talk-amigo/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setError("Invalid email");
      return;
    }
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        image : url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
  }

  const postData = () => {
  if(img){
 uploadImg()
  }
  else {
 uploadFields()
  }
  };

  return (
    <div className="container-fluid stardust-bg">
      {/* <div> <img src="images/logo.png" alt="logo" className="logo" /> </div> */}

      <div className="container-fluid doodle-dots-bg">
        <div className="row ">
          <div className="col-md-6  d-flex justify-content-start  illustration-div">
            <img
              src="images/treeperson.png"
              alt="planet-image"
              className="treeperson-image"
            />
            <img
              src="images/headphone.png"
              alt="headphone-image"
              className="headphone-image "
            />
            <img
              src="images/toy.png"
              alt="rocket-image"
              className="toy-image"
            />
            <img
              src="images/phone.png"
              alt="phone-image"
              className="phone-image "
            />
          </div>

          <div className=" offset-md-3 col-md-3 col-sm-12 login-register-box ">
            <div>
              {error !== "" ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                ""
              )}
              <div className="form-group text-left  input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user fa-2x input icon"></i>
                  </span>
                </div>

                <input
                  type="text"
                  className="form-control login-register-input"
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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

              <div className="form-group text-left  ">
                <label>Upload Image: </label>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
              {/* <div className="form-group text-left  input-group">

                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fas fa-key fa-2x input icon"></i></span>
                                    </div>

                                    <input type="password" className="form-control login-register-input" id="confirmPassword "
                                        placeholder="Confirm Password"  value={password} onChange={(e)=>setPassword(e.target.value)} required />
                                </div> */}
              <button
                onClick={() => postData()}
                className="btn btn-lg btn-block login-register-button"
              >
                SIGNUP
              </button>

              <p className="loginLink">
                Already have an account? <Link to="/login"> Login </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
