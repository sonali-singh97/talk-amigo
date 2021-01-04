import React, { useState, useContext, useEffect } from "react";
import Post from "../components/Post";
// import Navbar from "../components/Navbar";
import Friend from "../components/Friend";
import { UserContext } from "../App";
const Feed = () => {
  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/posts/getfollowingposts", {
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
    fetch("/posts/like", {
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
    fetch("/posts/unlike", {
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
  fetch("/posts/comment", {
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
    fetch(`/posts/delete/${postId}` , {
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
      <div className="container ">
        <div className="row">
          <div className="container stardust-bg col-md-9">
            {data && data.map((item) => {
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

          <div class="container col-md-3">
            <div class="friend-list-heading">Friends</div>

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
  );
};

export default Feed;
