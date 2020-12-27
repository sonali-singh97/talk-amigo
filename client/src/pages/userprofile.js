import React from 'react';
import GalleryImage from '../components/GalleryImage';
import Navbar from '../components/Navbar';

function UserProfile() {
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
        borderBottom: "1px solid grey"
      }}>
        <div>
          <img style={{ width: "160px", height: "160px", borderRadius: "80px", paddingBottom: "10px " }}
            src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"
          />
        </div>
        <div  className="user-detail-box">
          <h3 style={{ color: "white" }}>User Name</h3>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "108%",
            color: "white"
          }}>
            <h5 className="details">50 posts</h5>
            <h5 className="details">50 followers</h5>
            <h5 className="details">50 following</h5>
          </div>
          <div>
            <button type="button" className="btn  user-detail-button">Follow</button>
            <button type="button" className="btn  user-detail-button">Message</button>
          </div>
        </div>
      </div>

      <div className="Gallery  background-texture-gallery">


        <GalleryImage />

        <GalleryImage />

        <GalleryImage />

        <GalleryImage />

        <GalleryImage />

        <GalleryImage />

        <GalleryImage />

        <GalleryImage />



      </div>


    </div>
    </div>
  )
}

export default UserProfile;
