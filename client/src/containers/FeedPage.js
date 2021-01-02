import React, { useState, useContext, useEffect } from "react";
import Post from "../components/Post";
// import Navbar from "../components/Navbar";
import Friend from "../components/Friend";
import { UserContext } from "../App";
const Feed = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/posts/allposts", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);


  const likepost = (id) => {
    fetch("http://localhost:5000/posts/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("jwt")
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
            
          } 
           else 
            return item;
          
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };


  const unlikepost = (id) => {
    fetch("http://localhost:5000/posts/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
      })
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
           return result;
            
          } 
           else 
            return item;
          
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (text, postId) => {
  fetch("http://localhost:5000/posts/comment", {
    method : "put",
    headers : {
      "Content-Type" : "application/json",
      "authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body : JSON.stringify({
      text,
      postId
    })
  })
  .then(res => res.json())
  .then(result => {
    console.log(result);
    const newData = data.map((item) => {
      if (item._id === result._id) {
       return result;
        
      } 
       else 
        return item;
      
    });

    setData(newData);
  })
  .catch(err => console.log(err));
  }

  const deletePost =(postId) =>{
    fetch(`http://localhost:5000/posts/delete/${postId}` , {
      method : "delete",
      headers : {
               "authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      const newData = data.filter((item) => {
          return item._id!== result._id        
      });
     console.log("post deleted successfully")
      setData(newData);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="container-fluid">
      {/* <Navbar /> */}
      <div className="container "  style={{marginTop:"4rem"}}>
        <div className="row">
          <div className="container stardust-bg col-md-9">
            {data.map((item) => {
              return (
                <Post
                  key={item._id}
                  post={item}
                  state={state}
                  like={() => likepost(item._id)}
                  unlike={() => unlikepost(item._id)}
                  comment={(text)=> makeComment(text, item._id)}
                  delete = {()=> deletePost(item._id)}
                />
              );
            })}
          </div>

          <div className="container col-md-3" style={{position:"sticky"}}>
                            <div className="friend-list-heading" >
                                <img className="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1" alt="avatar" />
                                <div className="about-me">
                                    <div className="my-name"> ME </div>
                                    <div > About me  </div>

                                </div></div>

                                <div className="suggestions">

<div className="suggestion-heading"> Suggestions for you </div>


            <ul className="friend-list">
              <Friend />
              <Friend />
              <Friend />
              <Friend />
              <Friend />
              <Friend />
              <Friend />
              <Friend />
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
