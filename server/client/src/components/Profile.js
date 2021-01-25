import React, { useState, useContext, useEffect } from "react";
import GalleryImage from "./GalleryImage";
import Navbar from "./Navbar";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState(null);
  const { userId } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const followUser = () => {
    fetch(`/user/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers },
        });
        localStorage.setItem("user", JSON.stringify(result));

        setProfile((prevstate) => {
          return {
            ...prevstate,
            user: {
              ...prevstate.user,
              followers: [...prevstate.user.followers, result._id],
            },
          };
        });
        setShowFollow(false);
      })
      .catch((err) => console.log(err));
  };

 const unfollowUser = () => {
    fetch(`/user/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch({
          type: "UPDATE",
          payload: { following: result.following, followers: result.followers },
        });
        localStorage.setItem("user", JSON.stringify(result));

        setProfile((prevstate) => {
          const newFollowersArray = prevstate.user.followers.filter(
            (item) => item !== result._id
          );
          return {
            ...prevstate,
            user: {
              ...prevstate.user,
              followers: newFollowersArray,
            },
          };
        });
        setShowFollow(true);
      })
      .catch((err) => console.log(err));
  };

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
              (comment) => comment._id != commentId
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
    <div className="fluid-container stardust-bg  below-navbar">
      {/* <Navbar /> */}

      {userProfile ? (
        <div className="container ">
          <div
            className="user-detail"
            style={{
              display: "flex",
              justifyContent: "start",
              maxWidth: "700px",
              margin: "25px auto 18px",
              // marginTop:"1rem",
              // borderBottom: "1.5px solid grey",
            }}
          >
            <div>
              <img
                style={{
                  width: "175px",
                  height: "175px",
                  borderRadius: "100%",
                  paddingBottom: "5px ",
                }}
                src={userProfile.user.image}
              />
            </div>
            <div className="user-detail-box">
              <h2 style={{ color: "white",marginBottom:"1.5rem" }}>{userProfile.user.username}</h2>
              <h4 style={{ color: "white" }}>{ userProfile.user.bio ? userProfile.user.bio : "" }</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                  color: "white",
                }}
              >
                <h5 className="details">{userProfile.posts.length} posts</h5>
                <h5 className="details">
                  {userProfile.user.followers.length} followers
                </h5>
                <h5 className="details">
                  {userProfile.user.following.length} following
                </h5>
              </div>
              <div>
                {showFollow ? (
                  <button
                    type="button"
                    className="btn  user-detail-button"
                    onClick={followUser}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn  user-detail-button"
                    onClick={unfollowUser}
                  >
                    Unfollow
                  </button>
                )}

                <button type="button" className="btn  user-detail-button">
                  Message
                </button>
              </div>
            </div>
          </div>

          <div className="Gallery  background-texture-gallery"
          style={{ borderTop: "0.2rem solid grey", marginTop: "3.5rem"}}>
            {userProfile.posts.map((item) => (
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
      ) : (
        <h2>loading ....</h2>
      )}
    </div>
  );
}

export default UserProfile;
