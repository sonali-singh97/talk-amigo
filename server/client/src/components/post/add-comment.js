import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddComment(props) {
  const [comment, setComment] = useState("");


  return (

    <div className="d-flex" style={{ textAlign: "left" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.comment(e.target[0].value);
          setComment("");
        }}
      >
        <input
          type="text"
          className="post-input"
          placeholder=" Comment Something"
          value={comment}
          onChange={(e) => setComment(e.target.value)}

        />
      </form>

      <Link
        className="text-button"
        onClick={() => {
          props.comment(comment);
          setComment("");
        }}
        to="#"
      >
        POST
      </Link>

      {/* <button
              onClick={ () =>{props.comment(comment)}}
              className="btn btn-lg  login-register-button"
            >
              POST
            </button> */}
    </div>

  );
}

export default AddComment;