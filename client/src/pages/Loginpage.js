import React from 'react';
import {Link} from 'react-router-dom';

function Loginpage() {

    return (
        <div className="container-fluid stardust-bg">

            <div  >  <img src="images/logo.png" alt="logo" className="logo" /> </div>
            <img src="images/star1.png" alt="star" className="star1" />
            <img src="images/star1.png" alt="star" className="star2" />

            <div className="container-fluid  ">

                <div className="row">
                    <div className="mt-0 pt-0 col-md-6  d-flex justify-content-start  illustration-div">
                        <img src="images/planet.png" alt="planet-image" className="planet-image" />
                        <img src="images/Saly-6.png" alt="person-image" className="person-image img-fluid" />
                        <img src="images/rocket.png" alt="rocket-image" className="rocket-image" />
                        <img src="images/camera.png" alt="camera-image" className="camera-image" />
                    </div>

                    <div className=" mt-0 pt-0 offset-md-3 col-md-3 col-sm-12 login-register-box">

                        <div className="">

                            <form>
                                <div className="form-group text-left  input-group">

                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fas fa-user fa-2x input icon"></i></span>
                                    </div>

                                    <input type="text"
                                        className="form-control login-register-input"
                                        id="username"
                                        placeholder="Username"
                                        required
                                    />

                                </div>

                                <div className="form-group text-left input-group">

                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fas fa-key fa-2x input icon"></i></span>
                                    </div>

                                    <input type="password"
                                        className="form-control  login-register-input"
                                        id="password"
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg btn-block  login-register-button"
                                >
                                    LOGIN
        </button>
                            </form>

                            <div className="forgot-password"> <a href=""  > Forgot Password </a> </div>
                            <Link to="/">
                              <p className="signupLink">Don't have an account? <a href=""> SignUp </a> </p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Loginpage;