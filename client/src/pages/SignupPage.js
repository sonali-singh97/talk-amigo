import React from 'react';

function SignupPage(){

    return(
        <div className="container-fluid">

    <div> <img src="images/logo.png" alt="logo" className="logo" /> </div>

    <div className="container-fluid doodle-dots-bg">
    <div className="row ">

        <div className="col-md-6  d-flex justify-content-start  illustration-div">

            <img src="images/treeperson.png" alt="planet-image" className="treeperson-image" />
            <img src="images/headphone.png" alt="headphone-image" className="headphone-image " />
            <img src="images/toy.png" alt="rocket-image" className="toy-image" />
            <img src="images/phone.png" alt="phone-image" className="phone-image " />
        </div>



        <div className=" offset-md-3 col-md-3 col-sm-12 login-register-box ">


            <div className="  ">
                <form>
                    <div className="form-group text-left">

                        <input type="text" className="form-control login-register-input" id="username"
                            placeholder="Username"  required/>

                    </div>
                    <div className="form-group text-left">

                        <input type="email" className="form-control login-register-input" id="email" pattern=".+@gmail.com"
                            aria-describedby="emailHelp" placeholder="Email"  required/>

                    </div>
                    <div className="form-group text-left">

                        <input type="password" className="form-control login-register-input" id="password"
                            placeholder="Password"  required/>
                    </div>
                    <div className="form-group text-left">

                        <input type="password" className="form-control login-register-input" id="confirmPassword "
                            placeholder="Confirm Password"  required/>
                    </div>
                    <button type="submit" className="btn btn-lg btn-block login-register-button">
                        SIGNUP
                    </button>
                </form>
            </div>
        </div>

    </div>
</div>
</div>
    );
}

export default SignupPage ;