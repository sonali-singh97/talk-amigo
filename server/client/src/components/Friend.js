import React, {useState} from 'react';

function Friend() {
    const [isFollowed, setFollow] = useState(false);
    const [followtext , setFollowtext] = useState("Follow");

    function follow(){
        setFollow(true);
        setFollowtext("Unfollow");
    }

    function unfollow(){
        setFollow(false);
        setFollowtext("Follow");
    }

    return(
        <div>
            <li className="clearfix">
                                <img className="suggestion-dp" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1" alt="avatar" />
                                <div className="about">
                                    <div className="name">
                                        <span>Who?</span>
                                        <button type="button" className="btn follow-button" onClick={isFollowed ? unfollow : follow }>
                                             {followtext}
                                        </button>
                                    </div>
                                </div>
                            </li>
        </div>
    )
}

export default Friend;