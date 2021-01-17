import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const EditModal = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");




  const selectImg =(e) =>{
    e.preventDefault();
    document.getElementById('img-upload').click();
  }
  return (
    <div className="edit-modal">
      <dialog
        open
        className="edit-modal__content"
        style={{
          transform: props.show ? "" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {/* <i
          className="far fa-window-close close-icon"
          onClick={props.clicked}
        ></i> */}

        <h2>Edit Profile</h2>
        <hr />
        <div className="edit-modal__upload-photo">
          <div className="form-group text-left edit-btn ">
            <label  onClick={selectImg}>
              <i class="fas fa-pen"></i>
            </label>
            <input type="file" accept="image/*" id="img-upload" />
          </div>
          <div className="edit-modal-img-box">
            <img src={state ? state.image : null} alt="display pic" />
          </div>
        </div>

        <div className="edit-modal__info-box">
    
            <div className="form-group text-left edit-modal__input ">
            <label htmlFor="edit-profile-name">Your Name</label>
              <input
                type="text"
                className="form-control create-post-input"
                id="edit-profile-name"
                autocomplete="off"
                defaultValue={state ? state.username : null}
                style={{marginTop: 0}}
                   />
            </div>

            <div className="form-group text-left edit-modal__input ">
            <label htmlFor="edit-profile-bio">Your Bio</label>
              <input
                type="text"
                className="form-control create-post-input"
                id="edit-profile-bio"
                autocomplete="off"
                defaultValue={state ? state.bio : null}
                placeholder="your bio"
                style={{marginTop: 0}}
                   />
            </div>

        </div>
        <input type="submit" className="btn  edit-modal__btn" value="save" />
      </dialog>

      {props.show ? (
        <div className="edit-modal__overlay" onClick={props.clicked}></div>
      ) : null}
    </div>
  );

  {
    /* <>
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
        <div className="Modal__content"></div>
</div>
</> */
  }
};

export default EditModal;
