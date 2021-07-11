import React, { useState, useContext, useEffect } from "react";
import GalleryImage from "../GalleryImage";
//import Navbar from "./Navbar";
import { UserContext } from "../../App";
//import { useParams } from "react-router-dom";

function Photo(props) {

    const { state, dispatch } = useContext(UserContext);
    const [data, setData] = useState(null);
    
  
   
  
    const likepost = (id) => {
      fetch("/posts/like", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else return item;
          });
  
          setData(newData);
        })
        .catch((err) => console.log(err));
    };
  
    const unlikepost = (id) => {
      fetch("/posts/unlike", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId: id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else return item;
          });
  
          setData(newData);
        })
        .catch((err) => console.log(err));
    };
  
    const makeComment = (text, postId) => {
      fetch("/posts/comment", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          text,
          postId,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const newData = data.map((item) => {
            if (item._id === result._id) {
              return result;
            } else return item;
          });
  
          setData(newData);
        })
        .catch((err) => console.log(err));
    };
  
    const deletePost = (postId) => {
      fetch(`/posts/delete/${postId}`, {
        method: "delete",
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const newData = data.filter((item) => {
            return item._id !== result._id;
          });
          console.log("post deleted successfully");
          setData(newData);
        })
        .catch((err) => console.log(err));
    };
  
    const deleteComment = (postId, commentId) => {
      fetch(`/post/${postId}/comment/${commentId}`, {
        method: "put",
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const newData = data.map((item) => {
            if (item._id !== result._id) {
              const comments = item.comments.filter(
                (comment) => comment._id !== commentId
              );
              item.comments = comments;
            }
            return item;
          });
          console.log("comment deleted successfully");
          setData(newData);
        })
        .catch((err) => console.log(err));
    };

    return(
        <div className="Gallery  background-texture-gallery"
          style={{ borderTop: "0.2rem solid grey", marginTop: "3.5rem"}}>
            {props.userProfile.posts.map((item) => (
             <GalleryImage
             key={item._id}
             item={item}
             state={state}
             like={() => likepost(item._id)}
             unlike={() => unlikepost(item._id)}
             comment={(text) => makeComment(text, item._id)}
             delete={() => deletePost(item._id)}
             deleteComment={(commentId) => deleteComment(item._id, commentId)}
            
           />
            ))}
          </div>
    );
}

export default Photo;