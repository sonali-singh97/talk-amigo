import React from 'react';


function Post() {
  return (
    <div className="row">
      <div className="col-sm-10">
        <div className='card post'>

          <div className="card-header" >
            <img src="images/photo.jpg" className="post__avatar" />
            <span className="post__name">Name </span>
          </div>


          <div className="card-body" >
            <img src="images/photo.jpg" className="post__image" />
          </div>

          <div className="card-footer">
            <span className="icons__box round-box">
              <img className="icon" src="images/heart.png" />
              <span className="no">1000</span>

            </span>
            <span className="icons__box round-box">
              <img className="icon" src="images/speech-bubble.svg" />
              <span>1000</span>
            </span>

            <div className=" d-flex post__comment">
              <img src="images/photo.jpg" className=" post__avatar" />
              {/* <span className=" round-box">
                    Comment Something
                  </span> */}
              <input type="text" className="post__comment-input round-box" placeholder="Comment Something" />
            </div>

          </div>


        </div>


      </div>
    </div>

  )
}


export default Post;