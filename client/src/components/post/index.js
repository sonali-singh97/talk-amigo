import React from "react";
import AddComment from "./add-comment";
import Comment from "./comment";
import Footer from "./footer";
import Header from "./header";

function Post(props) {

  //console.log(props.post);
  const feedPost = props.post;
  return (
    <div className=" post-container">
      <div className="card post">
        <Header post={props.post} state={props.state} delete={props.delete} />

        <div className="card-body">
          <img src={props.post.photo} className="post__image" />
        </div>

        <div className="card-footer">
          <Footer post={props.post}
            state={props.state}
            like={props.like}
            unlike={props.unlike}
            comment={props.comment}
          />

          <hr />

          <div
            className={props.post.comments.length !== 0 ? "comments-box" : ""}
          >
            {props.post.comments.map((comment) => {
              console.log(comment)
              return (
                <div key={comment._id} >
                  <Comment comment={comment} state={props.state} post={props.post} deleteComment={props.deleteComment} comment_id={comment._id} />
                </div >
              )
            })}
          </div>




          {props.post.comments.length !== 0 && <hr />}

          <AddComment comment={props.comment} />
        </div>
      </div>
    </div>
  );
}

export default Post;