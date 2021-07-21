import React from "react";

function Footer(props) {

  return (
    <div>
      <span className="icons__box round-box">
        {props.post.likes.includes(props.state._id) ? (
          <i
            className="fas  fa-thumbs-up icon"
            style={{ cursor: "pointer" }}
            onClick={props.unlike}
          ></i>
        ) : (
          <i
            className="far fa-thumbs-up icon"
            style={{ cursor: "pointer" }}
            onClick={props.like}
          ></i>
        )}

        <span className="no">{props.post.likes.length}</span>
      </span>
      <span className="icons__box round-box">
        <i class="fas fa-comments icon"></i>
        <span>{props.post.comments.length}</span>
      </span>

      <div class="post__details">
        <span style={{ marginRight: 10, color: "#f0d2dc" }} >{props.post.postedBy.username}</span>
        <span> {props.post.caption} </span>
      </div>
    </div>
  );
}

export default Footer;