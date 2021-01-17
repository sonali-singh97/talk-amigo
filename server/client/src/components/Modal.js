import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Modal = (props) => {
  const [search, setSearch] = useState(null);
  // const [show, setShow] = useState(false);
  const [users, setUsers] = useState(null);
  // const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const { state, dispatch } = useContext(UserContext);

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

  return (
    //   <div className="modal"  style={{
    //     transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
    //     opacity: this.props.show ? '1' : '0'
    // }} >

    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h5 className="modal-title">Search </h5>
    //           <button
    //             type="button"
    //             style={{ height: 20, width: 20 }}
    //             className="btn-close"
    //           ></button>
    //         </div>
    //         <div className="modal-body">
    //           <div className="form-group text-left  input-group">
    //             <input
    //               type="text"
    //               className="form-control login-register-input"
    //               placeholder="search users"
    //               name="search"
    //               value={search}
    //               onChange={(e) => fetchUsers(e.target.value)}
    //               required
    //             />
    //           </div>

    //           <ul className="list-group">
    //             {users &&
    //               users.map((user) => {
    //                 return (
    //                   <Link
    //                     key={user._id}
    //                     to={
    //                       user._id !== state._id
    //                         ? `/user/${user._id}`
    //                         : `/user_profile`
    //                     }
    //                     onClick={() => {
    //                       setSearch("");
    //                     }}
    //                     data-bs-dismiss="modal"
    //                   >
    //                     <li className="list-group-item">
    //                       <img
    //                         alt="profile pic"
    //                         src={user.image}
    //                         style={{
    //                           width: 20,
    //                           height: 20,
    //                           borderRdius: "50%",
    //                           marginRight: 5,
    //                         }}
    //                       />
    //                       {user.username}
    //                       <p>{user.email}</p>
    //                     </li>{" "}
    //                   </Link>
    //                 );
    //               })}
    //           </ul>
    //         </div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-danger"
    //             onClick={() => {
    //               setSearch("");
    //               handleClose();
    //             }}
    //           >
    //             {" "}
    //             Close
    //           </button>
    //         </div>
    //       </div>

    //   </div>
    <>
      {/* <Backdrop show={this.props.show} clicked={this.props.modalClosed} /> */}

      {props.show ? (
        <div className="Backdrop" onClick={props.clicked}></div>
      ) : null}
      <div
        className="Modal"
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <i
          className="far fa-window-close close-icon"
          onClick={props.clicked}
        ></i>
        <div className="Modal__content">
          <div className="form-group text-left  input-group" >
            <input
              type="text"
              className="form-control login-register-input"
              placeholder="search users"
              name="search"
              value={search}
              autoComplete="off"
              onChange={(e) => fetchUsers(e.target.value)}
              style={{marginTop:5}}
              required
            />

            <div className="input-group-prepend"  >
              <span className="input-group-text" style={{marginTop:5}}>
                <i
                  className="fas fa-search  mt-2" style={{fontSize:20}}
                  onClick={() => fetchUsers(search)}
                ></i>
              </span>
            </div>
          </div>

          {users &&
            users.map((user) => {
              return (
                <div key={user._id} className="Modal__list">
                  <div
                    className="name"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <img
                      alt="profile pic"
                      src={user.image}
                      className="suggestion-dp"
                    />

                    <div className="friend__details">
                      <span>
                        <Link
                          to={
                            user._id !== state._id
                              ? `/user/${user._id}`
                              : `/user_profile`
                          }
                          onClick={() => {
                            setSearch("");
                            setUsers("");
                            props.clicked();
                          }}
                          style={{ color: "#f4abc4" }}
                        >
                          {user.username}
                        </Link>
                      </span>
                      <span>{user.email} </span>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Modal;
