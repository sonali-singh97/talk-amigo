import React, { Component } from 'react';
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import Friend from "../components/Friend";
class Feed extends Component {

    render() {

        return (
            <div className="container-fluid" >
                {/* <Navbar /> */}
                <div className="container ">
                    <div className="row">

                        <div className="container stardust-bg col-md-9" >
                            <Post />
                            <Post />
                        </div>

                        <div class="container col-md-3">
                            <div class="friend-list-heading" >
                                Friends
                            </div>

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
        )
    }
}

export default Feed;
