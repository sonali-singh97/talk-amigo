import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {



    return (
        <div className="container-fluid">
            <nav className="navbar  navbar-expand-lg ">
                <Link className="navbar-brand" to="/feed"> <img src="images/logo.png" alt="logo" className="logo" /> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/feed">
                                    <i class="fas fa-home fa-3x  navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/user_profile">
                                    <i class="fas fa-user-circle fa-3x navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/feed">
                                    <i class="fas fa-comments fa-3x navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/create_post">
                                    <i class="fas fa-plus fa-3x navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
