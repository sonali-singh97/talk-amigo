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

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userId}`, {
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
    fetch(`http://localhost:5000/user/follow`, {
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
    fetch(`http://localhost:5000/user/unfollow`, {
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

  return (
    <div className="fluid-container   stardust-bg">
      <Navbar />

      {userProfile ? (
        <div className="container ">
          <div
            className="user-detail"
            style={{
              display: "flex",
              justifyContent: "start",
              maxWidth: "700px",
              margin: "18px auto",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                  paddingBottom: "10px ",
                }}
                src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"
              />
            </div>
            <div className="user-detail-box">
              <h3 style={{ color: "white" }}>{userProfile.user.username}</h3>
              {/* <h4 style={{ color: "white" }}>{ userProfile.user.email}</h4> */}
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

          <div className="Gallery  background-texture-gallery">
            {userProfile.posts.map((item) => (
              <GalleryImage key={item._id} src={item.photo} />
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
