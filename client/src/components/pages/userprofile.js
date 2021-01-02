import React, {useState, useContext, useEffect} from 'react';
import GalleryImage from '../GalleryImage';
import Navbar from '../Navbar';
import {UserContext} from "../../App";



function UserProfile() {

  const {state,dispatch} = useContext(UserContext)
  const [myposts, setPosts] = useState([]);

  useEffect(()=>{
  fetch("http://localhost:5000/posts/myposts", {
    headers : {
      "authorization": "Bearer "+ localStorage.getItem("jwt")
    }

  })
  .then(res => res.json())
  .then(result => {
  
    setPosts(result.myposts)})
  .catch(err => console.log(err));
  }, [])

  return (
    <div className="fluid-container   stardust-bg">
      <Navbar />
    <div className="container ">
      <div
      className="user-detail"
      style={{
        display: "flex",
        justifyContent: "start",
        maxWidth: "700px",
        margin: "18px auto",
      //  borderBottom: "1px solid grey"
      }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px", paddingBottom: "10px " }}
            src={state? state.image : null}
          />
        </div>
        <div  className="user-detail-box">
          <h3 style={{ color: "white" }}>{state? state.username : "loading"}</h3>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "108%",
            color: "white"
          }}>
            <h5 className="details">{myposts.length} posts</h5>
            <h5 className="details">{state ? state.followers.length : 0 } followers</h5>
            <h5 className="details">{state ? state.following.length : 0} following</h5>
          </div>
          <div>
            <button type="button" className="btn  user-detail-button">Follow</button>
            <button type="button" className="btn  user-detail-button">Message</button>
          </div>
        </div>
      </div>

      <div className="Gallery  background-texture-gallery"  style={{borderTop: "0.15rem solid grey"}}>

   { myposts.map(item => <GalleryImage key={item._id} src={item.photo} /> )}
      
      </div>


    </div>
    </div>
  )
}

export default UserProfile;
