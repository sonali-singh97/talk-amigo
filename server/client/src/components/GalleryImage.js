import React, {useState} from 'react';

function GalleryImage(props) {
    const [isMouseOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseLeave() {
    setMouseOver(false)
  }

    return(
<div className="img" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <img src={props.src} />

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