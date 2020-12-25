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
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">                             
                             <i className="fas fa-home fa-3x  navbar-icons"></i>                                                           
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user_profile">       
                            <i className="fas fa-user-circle fa-3x navbar-icons"></i>                                                           
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">   
                            <i className="fas fa-comments fa-3x navbar-icons"></i>                                                                                          
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;