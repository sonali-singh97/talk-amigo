import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import Modal from "./Modal";

function Navbar() {
  

  const [search, setSearch] = useState(null);
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((users) => {
        console.log(users);
        setUsers(users.user);
      })

      .catch((err) => console.log(err));
  };

  const renderList = () => {
    if (state) {
      return [
        <li className="nav-item">
          <i
            className="fas fa-search fa-2x  navbar-icons  mt-2"
           onClick={handleShow}
          ></i>
        </li>,
        <li className="nav-item">
          <a className="nav-link" href="#">
            <Link to="/">
              <i className="fas fa-home fa-2x  navbar-icons"></i>
            </Link>
          </a>
        </li>,
        <li className="nav-item">
        <a className="nav-link" href="#">
          <Link to="/explore">
            {/* <button className="btn btn-lg navbar-button mr-2">Explore</button> */}
            <i className="fas fa-compass fa-2x  navbar-icons"></i>
          </Link>
        </a>
      </li>,
        <li className="nav-item">
          <a className="nav-link" href="#">
            <Link to="/user_profile">
              <i className="fas fa-user-circle fa-2x navbar-icons"></i>
            </Link>
          </a>
        </li>,

        <li className="nav-item">
          <a className="nav-link" href="#">
            <Link to="/create_post">
              <i className="fas fa-plus fa-2x navbar-icons"></i>
            </Link>
          </a>
        </li>,
        <li className="nav-item">
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
            className="bg-transparent border-0 mt-2"
          >
            <i className="fas fa-sign-out-alt fa-2x navbar-icons"></i>
          </button>
        </li>,
      ];
    } else
      return [
        <li className="nav-item">
          <a className="nav-link" href="#">
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              className="navbar-login-link"
            >
              <i className="fas fa-sign-in-alt fa-2x navbar-icons mr-3"></i>
              <span className="navbar-login-text">LOGIN</span>
            </Link>
          </a>
        </li>,
      ];
  };

  return (
    <div className="container-fluid">
      <nav className="navbar  navbar-expand  navbar-light fixed-top pt-0 pb-0">
        <div className="container-fluid">
          <Link className="navbar-brand" to={state ? "/feed" : "/signup"}>
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
            <div className=" navbar-nav ml-auto">
              <ul className="navbar-nav">{renderList()}</ul>
            </div>
          </div>
        </div>
      </nav>
      
      <Modal show={show} clicked={handleClose}  />
     
    </div>
  );
}

export default Navbar;
