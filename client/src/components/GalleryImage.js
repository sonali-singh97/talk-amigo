import React, {useState} from 'react';

function GalleryImage() {
    const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseLeave() {
    setMouseOver(false)
  }

    return(
<div className="img" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1" />

            {isMouseOver && (
              <div className="like-comment" >
                <span className="icons__box1 round-box">
                  <img className="icon1" src="images/heart.png" />
                  <span className="no">1000</span>
                </span>

                <span className="icons__box1 round-box">
                  <img className="icon1" src="images/speech-bubble.svg" />
                  <span>1000</span>
                </span>
              </div>
            )}
          </div>
    );
}

export default GalleryImage;