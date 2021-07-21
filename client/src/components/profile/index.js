import React, { useState, useContext, useEffect } from "react";
import GalleryImage from "../GalleryImage";
//import Navbar from "./Navbar";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import Photo from "./photo";
import Header from "./header";

function UserProfile() {
  //const { state, dispatch } = useContext(UserContext);
  const [userProfile, setProfile] = useState(null);
  const { userId } = useParams();
  // const [showFollow, setShowFollow] = useState(
  //   state ? !state.following.includes(userId) : true
  // );
  // const [data, setData] = useState(null);

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

  

  return (
    <div className="fluid-container stardust-bg  below-navbar">
      {/* <Navbar /> */}

      {userProfile ? (
        <div className="container ">
          <Header  
          //post={props.post}
          userProfile = {userProfile}
          userId={userId}
          />

          <Photo 
         // key={item._id}
          //item={item}
        //   state={state}
        //   like={() => likepost(item._id)}
        //   unlike={() => unlikepost(item._id)}
        //   comment={(text) => makeComment(text, item._id)}
        //   delete={() => deletePost(item._id)}
        //   deleteComment={(commentId) => deleteComment(item._id, commentId)}
        userProfile = {userProfile}
          />

        </div>
      ) : (
        <h2>loading ....</h2>
      )}
    </div>
  );
}

export default UserProfile;