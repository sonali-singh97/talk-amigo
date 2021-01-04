import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import{ UserContext} from "../App";

function Navbar() {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory("");

    const renderList = () =>{
        if(state){
            return [
                <li className="nav-item">
                <a className="nav-link" href="">
                  <Link to="/explore">
                    <button>Explore</button>
                  </Link>
                </a>
              </li> ,
                 <li className="nav-item">
                 <a className="nav-link" href="">
                   <Link to="/">
                   <i className="fas fa-home fa-3x  navbar-icons"></i>
                   </Link>
                 </a>
               </li> ,
              <li className="nav-item">
                <a className="nav-link" href="">
                  <Link to="/user_profile">
                    <i className="fas fa-user-circle fa-3x navbar-icons"></i>
                  </Link>
                </a>
              </li> ,
              <li className="nav-item">
                <a className="nav-link" href="">
                  <Link to="/feed">
                    <i className="fas fa-comments fa-3x navbar-icons"></i>
                  </Link>
                </a>
              </li> ,
              <li className="nav-item">
                <a className="nav-link" href="">
                  <Link to="/create_post">
                    <i className="fas fa-plus fa-3x navbar-icons"></i>
                  </Link>
                </a>
              </li>,
              <li className="nav-item">
                 <button onClick={()=>{
                   localStorage.clear();
                   dispatch({type :"CLEAR"});
                   history.push("/login");
                 }}>
                 LOGOUT
                </button>
              </li>
            ]
        }
        else return [
            <li className="nav-item">
            <a className="nav-link" href="">
              <Link to="/signup">
                SIGNUP
              </Link>
            </a>
          </li> ,
           <li className="nav-item">
           <a className="nav-link" href="">
             <Link to="/login">
               SIGNIN
             </Link>
           </a>
         </li>
        ]
    }

  return (
    <div className="container-fluid">
      <nav className="navbar  navbar-expand-lg  navbar-light">
       <div className="container-fluid">
        <Link className="navbar-brand" to={state ? "/feed": "/signup"}>
          {" "}
          <img src="images/logo.png" alt="logo" className="logo" />{" "}
        </Link>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className= " navbar-nav ml-auto">
          <ul className="navbar-nav">
            {renderList()}
          </ul>
          </div>
        </div>
        </div>
      </nav>
      </div>
 
  );
}

export default Navbar;
