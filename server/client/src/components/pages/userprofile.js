import React, {useState, useContext, useEffect} from 'react';
import GalleryImage from '../GalleryImage';
import Navbar from '../Navbar';
import {UserContext} from "../../App";



function UserProfile() {

  const {state,dispatch} = useContext(UserContext);
  const [myposts, setPosts] = useState([]);
  const [image,setImage] = useState("");

  useEffect(()=>{
  fetch("/posts/myposts", {
    headers : {
      "authorization": "Bearer "+ localStorage.getItem("jwt")
    }

  })
  .then(res => res.json())
  .then(result => {
  
    setPosts(result.myposts)})
  .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    if(image){
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "talk-amigo");
  
      fetch("https://api.cloudinary.com/v1_1/talk-amigo/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) =>{
          console.log(data)
        

          fetch("/user/updateImg", {
            method : "put",
            headers :{
              "Content-Type": "application/json",
              "authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body : JSON.stringify({
              image : data.url
            })
          }).then (res => res.json())
          .then(res => {
            console.log(res);
            localStorage.setItem("user",JSON.stringify({...state, image : res.image}));
         dispatch({type : "UPDATEPIC", payload : res.image})
          })
          .catch(err => console.log(err))
        } )
        .catch((err) => console.log(err));
    }
  },
   [image])

  const updateImg = (file) => {
    setImage(file);
   
  };

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

<div className="form-group text-left  ">
                <label>Upload Image: </label>
                <input
                  type="file"
                  onChange={(e) => updateImg(e.target.files[0])}
                />
              </div>
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
          {/* <div>
            <button type="button" className="btn  user-detail-button">Follow</button>
            <button type="button" className="btn  user-detail-button">Message</button>
          </div> */}
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
