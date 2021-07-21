import React from "react";
import { Link } from "react-router-dom";

function Header(props) {

  return (
    <div >
      <div>
        <img src={props.post.postedBy.image} className="post__avatar" />
        <span className="post__user bold-text">
          <Link
            to={
              props.post.postedBy._id !== props.state._id
                ? `/user/${props.post.postedBy._id}`
                : `/user_profile`
            }
          >
            {props.post.postedBy.username}
          </Link>{" "}
        </span>
      </div>
      {props.post.postedBy._id === props.state._id && (
        <div className="icon-box">
          <i class="fas fa-trash-alt icon" onClick={props.delete}></i>
        </div>
      )}
    </div>
  );
}

export default Header;