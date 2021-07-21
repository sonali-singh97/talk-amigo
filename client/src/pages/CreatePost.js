import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


function CreatePost() {
  const history = useHistory("");
  // const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState(null);
  let [error, setError] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/posts/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          caption,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            setError(data.error);
          } else {
            console.log(data.message);
            history.push("/");
          }
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    }
  }, [url]);
  const post = () => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "talk-amigo");

    fetch("https://api.cloudinary.com/v1_1/talk-amigo/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid stardust-bg below-navbar" style={{height: "100vh"}}>
      {/* <Navbar /> */}
      <div className="container">
        <div className="row justify-content-center">
          {" "}
          <div className=" col-lg-5  col-md-6  col-sm-8">
            <div className="card text-white bg-transparent create-post-card">
              <div className="card-header">Create Post</div>
              <div className="card-body">
                <div className="form-group text-left  ">
                  <label>Upload Image: </label> <br />
                  <input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
                 {
                   img && <div> <img src={URL.createObjectURL(img)} alt="post"  className="preview-img"/></div>
                 }
                <div className="form-group text-left  ">
                  <input
                    type="textarea"
                    className="form-control create-post-input"
                    id="caption"
                    autocomplete="off"
                    placeholder="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>

                <button
                  onClick={() => post()}
                  className="btn btn-lg  create-post-button"
                >
                  POST
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
