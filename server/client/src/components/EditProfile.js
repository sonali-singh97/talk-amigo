import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const EditModal = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [name, setName] = useState(state ? state.username : null);
  const [bio, setBio] = useState(state ? state.bio : null);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "talk-amigo");

      fetch("https://api.cloudinary.com/v1_1/talk-amigo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          fetch("/user/updateImg", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              image: data.url,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, image: res.image })
              );
              dispatch({ type: "UPDATEPIC", payload: res.image });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  const updateImg = (file) => {
    setImage(file);
  };

  const updateInfo = (e) => {
    e.preventDefault();
    fetch("/user/updateInfo", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        bio,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Info updated successfully", res);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, username: res.username, bio: res.bio })
        );
        dispatch({
          type: "UPDATEINFO",
          payload: { username: res.username, bio: res.bio },
        });
      })
      .catch((err) => console.log(err));
  };

  const selectImg = (e) => {
    e.preventDefault();
    document.getElementById("img-upload").click();
  };
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
        <div className="edit-modal__top">
          <i
            className="far fa-window-close close-icon"
            onClick={props.clicked}
          ></i>

          <h2>Edit Profile</h2>
        </div>

        <hr />
        <div className="edit-modal__upload-photo">
          <div className="form-group text-left edit-btn ">
            <label onClick={selectImg}>
              <i class="fas fa-pen"></i>
            </label>
            <input
              type="file"
              accept="image/*"
              id="img-upload"
              onChange={(e) => updateImg(e.target.files[0])}
            />
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
            
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              style={{ marginTop: 0 }}
            />
          </div>

          <div className="form-group text-left edit-modal__input ">
            <label htmlFor="edit-profile-bio">Your Bio</label>
            <input
              type="text"
              className="form-control create-post-input"
              id="edit-profile-bio"
              autocomplete="off"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              defaultValue={bio}
              placeholder="your bio"
              style={{ marginTop: 0 }}
            />
          </div>
        </div>
        <input
          type="submit"
          className="btn  edit-modal__btn"
          value="save"
          onClick={(e) => {
            updateInfo(e);
            props.clicked();
          }}
        />
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
