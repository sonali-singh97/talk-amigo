import React from "react";

function Comment(props) {

  return (
    <div>
      <div>
        <img src={props.comment.postedBy.image} className="post__avatar" />
        <span className="post__comment-name ">
          {props.comment.postedBy.username}
        </span>
        <span>{props.comment.text}</span>
      </div>
      {props.comment.postedBy._id === props.state._id && (
        <div className="icon-box">
          <i
            class="fas fa-trash-alt icon"
            onClick={() => props.deleteComment(props.comment_id)}
          ></i>
        </div>
      )}
    </div>
  );
}

export default Comment;
