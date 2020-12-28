import React, { Component } from 'react';
import Post from "../components/Post";
//import Navbar from "../components/Navbar";
class Feed extends Component {

    render() {

        return (
            <div className="container-fluid" >
                {/* <Navbar /> */}
                <div className="container stardust-bg" >
                    <Post />
                    <Post />
                </div>

            </div>
        )
    }
}

export default Feed;
