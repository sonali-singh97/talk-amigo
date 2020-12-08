import React , {Component} from 'react';
import Post from "../components/Post";
class Feed extends Component {

    render (){

        return (
       <div className="container">
         <Post />
         <Post />
         </div>
        )
    }
}

export default Feed;
