import React, { useState, useContext, useEffect } from "react";
//import GalleryImage from "../GalleryImage";
//import Navbar from "./Navbar";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

function Header(props) {

    const { state, dispatch } = useContext(UserContext);
    const [userProfile, setProfile] = useState(null);
    const { userId } = useParams();
    const [showFollow, setShowFollow] = useState(
      state ? !state.following.includes(userId) : true
    );
  
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
          followId: props.userId,
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
          unfollowId: props.userId,
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
  
   


    return(
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
                src={props.userProfile.user.image}
              />
            </div>
            <div className="user-detail-box">
              <h2 style={{ color: "white",marginBottom:"1.5rem" }}>{props.userProfile.user.username}</h2>
              <h4 style={{ color: "white" }}>{ props.userProfile.user.bio ? props.userProfile.user.bio : "" }</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                  color: "white",
                }}
              >
                <h5 className="details">{props.userProfile.posts.length} posts</h5>
                <h5 className="details">
                  {props.userProfile.user.followers.length} followers
                </h5>
                <h5 className="details">
                  {props.userProfile.user.following.length} following
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
    );
}

export default Header;