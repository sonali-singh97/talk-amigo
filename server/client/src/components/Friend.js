import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Friend(props) {
  // const [isFollowed, setFollow] = useState(false);
  // const [followtext , setFollowtext] = useState("Follow");

  // function follow(){
  //     setFollow(true);
  //     setFollowtext("Unfollow");
  // }

  // function unfollow(){
  //     setFollow(false);
  //     setFollowtext("Follow");
  // }
  const { state, dispatch } = useContext(UserContext);
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(props.user._id) : true
  );
 


  const followUser = () => {
    fetch(`/user/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: props.user._id,
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
        unfollowId: props.user._id,
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

   
        setShowFollow(true);
      })
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <li className="clearfix">
        <img className="suggestion-dp" src={props.user.image} alt="avatar" />
        <div>
          <div className="  name">
            <div className="friend__details">
              <span>
                <Link to={`/user/${props.user._id}`}>
                  {" "}
                  {props.user.username}
                </Link>
              </span>
              <span>{props.user.email}</span>
            </div>
          

            {showFollow ? (
              <button
                type="button"
                className="btn  follow-button"
                onClick={followUser}
              >
                Follow
              </button>
            ) : (
              <button
                type="button"
                className="btn  follow-button"
                onClick={unfollowUser}
              >
                Unfollow
              </button>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}

export default Friend;
