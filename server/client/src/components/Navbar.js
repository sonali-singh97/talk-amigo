import React, { useContext, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import{ UserContext} from "../App";



function Navbar() {
   const searchModal = useRef();
  
    const [search, setSearch] = useState(null);
    const [users, setUsers] = useState(null);
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory("");

   const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method : "post",
      headers : {
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(users => 
        {
          console.log(users);
          setUsers(users.user);
        })

        .catch(err => console.log(err))
   
   }

   

    const renderList = () =>{
        if(state){
            return [
              <li className="nav-item">
           <i className="fas fa-search fa-3x  navbar-icons" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
              </li>,
                <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to="/explore">
                    <button className="btn btn-lg navbar-button mr-2">Explore</button>
                  </Link>
                </a>
              </li> ,
                 <li className="nav-item">
                 <a className="nav-link" href="#">
                   <Link to="/">
                   <i className="fas fa-home fa-3x  navbar-icons"></i>
                   </Link>
                 </a>
               </li> ,
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to="/user_profile">
                    <i className="fas fa-user-circle fa-3x navbar-icons"></i>
                  </Link>
                </a>
              </li> ,
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <Link to="/feed">
                    <i className="fas fa-comments fa-3x navbar-icons"></i>
                  </Link>
                </a>
              </li> ,
              <li className="nav-item">
                <a className="nav-link" href="#">
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
                 }} 
                 className="bg-transparent border-0 mt-2">
                 <i className="fas fa-sign-out-alt fa-3x navbar-icons"></i>
                </button>
              </li>
            ]
        }
        else return [
            <li className="nav-item">
            <a className="nav-link" href="#">
              <Link to="/signup">
                <span className="navbar-button">SIGNUP</span>
              </Link>
            </a>
          </li> ,
           <li className="nav-item">
           <a className="nav-link" href="#">
             <Link to="/login">
             <span className="navbar-button">LOGIN</span>
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
       
      <div className="modal" tabindex="-1" id="staticBackdrop" ref={searchModal} >
  <div className="modal-dialog  modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Search </h5>
        <button type="button" style={{height:20 , width:20}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-group text-left  input-group">
                

                <input
                  type="text"
                  className="form-control login-register-input"           
                  placeholder="search users"
                  name="search"
                  value={search}
                  onChange={(e) => fetchUsers(e.target.value)}
                  required
                />
              </div>

              <ul className="list-group">
 {users && users.map((user) => {
    
 return   <Link  key ={user._id} to={user._id!== state._id ?`/user/${user._id}` : `/user_profile`} 
 onClick={()=>{ 
   
   setSearch("")}} >
   <li className="list-group-item" >
   <img alt="profile pic" src={user.image} style={{width: 20, height : 20 ,borderRdius: "50%" , marginRight: 5}}/>
    {user.username}
    <p>{user.email}</p>
     </li> </Link>
      })} 
</ul>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=>setSearch("")} >Close</button>
        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>

      </div>
 
  );
}

export default Navbar;
