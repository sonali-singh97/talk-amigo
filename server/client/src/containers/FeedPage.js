import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
// import Navbar from "../components/Navbar";
import Friend from "../components/Friend";
import { UserContext } from "../App";
const Feed = () => {
  const [data, setData] = useState([]);
  const [userList, setList] = useState(null);
  const { state, dispatch } = useContext(UserContext);
 

  useEffect(() => {
    fetch("/posts/allposts", {
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

  useEffect(() => {
    fetch("/suggested-users", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((list) => {
        setList(list.user);
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
          if (item._id === result._id) {
            const comments = item.comments.filter(
              (comment) => comment._id != commentId
            );
            console.log(comments);
            item.comments = comments;
          }
          return item;
        });
        console.log("comment deleted successfully");
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

  return (
    <div className=" below-navbar feedpage">
      {/* <Navbar /> */}
      <div style={{ marginTop: "4rem" }}>
        <div className="row">
          <div className="  col-lg-8 col-md-8 post-box-wrapper">
            {data.map((item) => {
              return (
                <Post
                  key={item._id}
                  post={item}
                  state={state}
                  like={() => likepost(item._id)}
                  unlike={() => unlikepost(item._id)}
                  comment={(text) => makeComment(text, item._id)}
                  delete={() => deletePost(item._id)}
                  deleteComment={(commentId) =>
                    deleteComment(item._id, commentId)
                  }
                />
              );
            })}
          </div>

          <div className=" col-lg-4 col-md-4  hide-it suggestion-box-wrapper fixed-top">
            {state && (
              <div className="friend-list-heading">
                <img className="" src={state.image} alt="avatar" />
                <div className="about-me">
                  <div className="my-name"> {state.username} </div>
                  <div> {state.email} </div>
                </div>
              </div>
            )}
            <hr/>

            <div className="suggestions">
              <div className="suggestion-heading">
                Suggestions for you
                <Link to="/suggestion_page" className="suggestion-page-link">
                  See all
                </Link>
              </div>

              <ul className="friend-list">
                {userList &&
                  userList.slice(0,3).map((user) => {
                    return <Friend key={user._id} user={user} />;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
