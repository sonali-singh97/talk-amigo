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

                        <div className="container col-md-3" style={{position:"sticky"}}>
                            <div className="friend-list-heading" >
                                <img className="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1" alt="avatar" />
                                <div className="about-me">
                                    <div className="my-name"> ME </div>
                                    <div > About me  </div>
                                    
                                </div>
                            </div>

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
        )
    }
}

export default Feed;
