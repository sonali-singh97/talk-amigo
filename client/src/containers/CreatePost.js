import React,{useState} from 'react';
import Navbar from "../components/Navbar";

function CreatePost() {

  const [title, setTitle] = useState("");
  const [body , setBody] = useState("");
  const [img , setImg] = useState("");

    return (
        <div className="container-fluid stardust-bg">
            <Navbar />
            <div className="container">
                <div className="row "> <div class="col-md-4 offset-md-4">
                    <div className="card text-white bg-transparent create-post-card"  >
                        <div className="card-header">
                            Create Post
                    </div>
                        <div className="card-body">
                            <form>

                                <div className="form-group text-left  ">
                                    <input type="text" className="form-control create-post-input" id="title"
                                        placeholder="title" value= {title} onChange={(e)=>setTitle(e.target.value)} />
                                </div>

                                <div className="form-group text-left  ">
                                    <input type="textarea" className="form-control create-post-input" id="body"
                                        placeholder="body" value={body} onChange={(e)=> setBody(e.target.value)} />
                                </div>

                                <div className="form-group text-left  ">
                                    <label>Upload Image: </label>
                                    <input type="file"  value={img} onChange={(e)=>console.log(e.target.files[0])} />
                                </div>

                                <button type="submit" className="btn btn-lg  login-register-button">
                                    POST
                    </button>

                            </form>


                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;