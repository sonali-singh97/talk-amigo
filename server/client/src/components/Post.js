import React from "react";
import { Link } from "react-router-dom";

function Post(props) {
  console.log(props.post);
  const feedPost = props.post;
  return (
    <div className="container post-container">
      <div className="row">
        <div className="col-sm-10">
          <div className="card post">
            <div className="card-header">
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

              {props.post.postedBy._id === props.state._id && (
                <i
                  class="fas fa-trash-alt"
                  style={{ color: "white", float: "right" }}
                  onClick={props.delete}
                ></i>
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
                    onClick={props.unlike}
                  ></i>
                ) : (
                  <i className="far fa-thumbs-up icon" onClick={props.like}></i>
                )}

                <span className="no">{props.post.likes.length}</span>
              </span>
              <span className="icons__box round-box">
                <img className="icon" src="images/speech-bubble.svg" />
                <span>{props.post.likes.length}</span>
              </span>

              <div class="post__details">
                <span className="bold-text">{props.post.title}</span>
                <p>{props.post.body}</p>
              </div>

              <hr />
              {props.post.comments.map((comment) => (
                <div key={comment._id} className="post__comment" >
                  <img src={comment.postedBy.image} className="post__avatar" />
                  <span className="post__comment-name">
                    <b>{comment.postedBy.username}</b>
                  </span>
                  <span>
                  { comment.text}
                  </span>
                </div>
              ))}

            { props.post.comments.length!=0 &&  <hr/>}
              <div className="d-flex">
               
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.comment(e.target[0].value);
                  }}

                >
                  <input
                    type="text"
                    className="post-input"
                   
                    placeholder=" Comment Something"
                  />
                </form>
                 
                <a href="#">POST</a>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
