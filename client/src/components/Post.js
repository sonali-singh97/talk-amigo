import React, { useState } from "react";
import { Link } from "react-router-dom";

function Post(props) {
  const [comment, setComment] = useState("");
  //console.log(props.post);
  const feedPost = props.post;
  return (
    <div className=" post-container">
      <div className="card post">
        <div className="card-header">
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

        <div className="card-body">
          <img src={props.post.photo} className="post__image" />
        </div>

        <div className="card-footer">
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
            <span style={{marginRight:10 , color:"#f0d2dc"}} >{props.post.postedBy.username}</span>
            <span> {props.post.caption} </span>
          </div>

          <hr />
          <div
            className={props.post.comments.length !== 0 ? "comments-box" : ""}
          >
            {props.post.comments.map((comment) => {
              console.log(comment) 
             return( <div key={comment._id} className="post__comment">
                <div>
                  <img src={comment.postedBy.image} className="post__avatar" />
                  <span className="post__comment-name ">
                    {comment.postedBy.username}
                  </span>
                  <span>{comment.text}</span>
                </div>
                {comment.postedBy._id === props.state._id && (
                  <div className="icon-box">
                    <i
                      class="fas fa-trash-alt icon"
                      onClick={() => props.deleteComment(comment._id)}
                    ></i>
                  </div>
                )}
              </div> )
           })}
          </div>
          {props.post.comments.length !== 0 && <hr />}
          <div className="d-flex" style={{textAlign:"left"}}>
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
        </div>
      </div>
    </div>
  );
}

export default Post;
