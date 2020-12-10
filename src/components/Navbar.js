import React from 'react';

function Navbar() {



    return (
        <div className="container-fluid">
            <nav className="navbar  navbar-expand-lg ">
                <a className="navbar-brand" href=""> <img src="images/logo.png" alt="logo" className="logo" /> </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a className="nav-link" href="">                             
                             <i class="fas fa-home fa-3x  navbar-icons"></i>                                                           
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">       
                            <i class="fas fa-user-circle fa-3x navbar-icons"></i>                                                           
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">   
                            <i class="fas fa-comments fa-3x navbar-icons"></i>                                                                                          
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;