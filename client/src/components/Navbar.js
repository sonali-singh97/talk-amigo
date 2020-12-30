import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {



    return (
        <div className="container-fluid">
            <nav className="navbar  navbar-expand-lg ">
                <Link className="navbar-brand" to="/feed"> <img src="images/logo.png" alt="logo" className="logo" /> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/feed">
                                    <i class="fas fa-home fa-3x  navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/user_profile">
                                    <i className="fas fa-user-circle fa-3x navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/feed">
                                    <i className="fas fa-comments fa-3x navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <Link to="/create_post">
                                    <i className="fas fa-plus fa-3x navbar-icons"></i>
                                </Link>
                            </a>
                        </li>
                    </ul>
                </div>

                
            </nav>
            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </div>
    </div>
  </div>
</nav> */}
        </div>
    );
}

export default Navbar;
