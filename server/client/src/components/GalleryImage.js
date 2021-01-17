import React, { useState } from "react";
import Post from "./Post";

function GalleryImage(props) {
  const [isMouseOver, setMouseOver] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseLeave() {
    setMouseOver(false);
  }

  return (
    <>
      <a href="#" onClick={handleShow}>
        <span
          className="post_img"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <img src={props.item.photo} />
          {isMouseOver ? <div className="post__overlay"></div> : null}

          {isMouseOver && (
            <div className="like-comment">
              <span className="icons__box1 round-box">
                <i className="fas  fa-thumbs-up icon1"></i>
                <span className="no">{props.item.likes.length}</span>
              </span>

              <span className="icons__box1 round-box">
                <i className="fas  fa-comments icon1"></i>
                <span>{props.item.comments.length}</span>
              </span>
            </div>
          )}
        </span>
      </a>
      <div className="edit-modal">
      {show ? (
           <i
           className="far fa-window-close close-icon"
           onClick={handleClose}
         ></i>
        ) : null}
        <dialog
          open
          className="edit-modal__content"
          style={{
            transform: show ? "" : "translateY(-100vh)",
            display: show ? "block" : "none",
            padding: 0,
          }}
        >
          <Post
            post={props.item}
            state={props.state}
            like={() => props.like(props.item._id)}
            unlike={() => props.unlike(props.item._id)}
            comment={(text) => props.comment(text, props.item._id)}
            delete={() => props.delete(props.item._id)}
            deleteComment={(commentId) =>
              props.deleteComment(props.item._id, commentId)
            }
          />
        </dialog>
        {show ? (
          <div className="edit-modal__overlay" onClick={handleClose}></div>
        ) : null}

      
      </div>
    </>
  );
}

export default GalleryImage;
