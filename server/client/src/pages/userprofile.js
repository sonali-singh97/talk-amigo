import React, { useState, useContext, useEffect } from "react";
import GalleryImage from "../components/GalleryImage";
import { UserContext } from "../App";
import EditModal from "../components/EditProfile";

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [myposts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [userList, setList] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("/posts/myposts", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.myposts);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div className="fluid-container   stardust-bg  below-navbar">
      <div className="container ">
        <div
          className="user-detail"
          style={{
            display: "flex",
            justifyContent: "start",
            maxWidth: "700px",
            margin: "25px auto",
            // borderBottom: "1px solid grey"
          }}
        >
          <div>
            <img className="User-Image"
              style={{
                width: "175px",
                height: "175px",
                borderRadius:"100%" ,
                paddingBottom: "1rem",
                
              }}
              src={state ? state.image : null}
            />
          </div>
          <div className="user-detail-box">
            <h2 className="User-Name" style={{ color: "white" }}>
              {state ? state.username : "loading"}
            </h2>
            <h4 style={{ color: "white" }}>
            {state ? state.bio : ""} 
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
                color: "white",
              }}
            >
              <h5 className="details n-o-posts">{myposts.length} posts</h5>
              <h5 className="details n-o-followers">
                {state ? state.followers.length : 0} followers
              </h5>
              <h5 className="details n-o-followers">
                {state ? state.following.length : 0} following
              </h5>
            </div>
            {/* <div>
            <button type="button" className="btn  user-detail-button">Follow</button>
            <button type="button" className="btn  user-detail-button">Message</button>
          </div> */}

            <button className="btn  user-detail-button" onClick={handleShow}>
              Edit Profile
            </button>

            <EditModal show={show} clicked={handleClose} />
          </div>
        </div>

        <div
          className="Gallery  background-texture-gallery"
          style={{ borderTop: "0.2rem solid grey", marginTop: "3.5rem" }}
        >
          {myposts.map((item) => (
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
      </div>
    </div>
  );
}

export default UserProfile;
