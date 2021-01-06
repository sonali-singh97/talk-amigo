import React from 'react';
import{Link} from 'react-router-dom';


function Post(props){
    console.log(props.post)
    const feedPost = props.post;
    return(
 
     ( <div className="container post-container">
  <div className="row">
  <div className="col-sm-10">
<div className='card post'>

<div className="card-header" >
 <img src={props.post.postedBy.image} className="post__avatar" />  
    <span className="post__name"><Link to = {props.post.postedBy._id!== props.state._id ?`/user/${props.post.postedBy._id}` : `/user_profile`}>{props.post.postedBy.username}</Link> </span>

    {props.post.postedBy._id === props.state._id && <i class="fas fa-trash-alt" style={{color: "white" ,float:"right"}}
    onClick={props.delete}></i>}
    </div>


    <div className="card-body" >
<img src={props.post.photo} className="post__image" />
</div>

<div className="card-footer">
  <span className="icons__box round-box">
  {props.post.likes.includes(props.state._id) ? 
  <i className="fas  fa-thumbs-up icon" onClick={props.unlike}></i> :
  <i className="far fa-thumbs-up icon" onClick={props.like}></i>
  }
 
  
  <span className="no">{props.post.likes.length}</span>

  </span>
  <span className="icons__box round-box">
    <img className="icon" src="images/speech-bubble.svg"/>
     <span>1000</span>
  </span>


  <div class="post__details">
    <h2>{props.post.title}</h2>
    <p>{props.post.body}</p>
  </div>
    {
     props.post.comments.map(
       comment => (<h6 key={comment._id} style={{color : "#fff", fontSize: "1.2rem"}}>
         <span><b>{comment.postedBy.username}</b></span>
           {"    " + comment.text}
       </h6>)
     )
    }
  <div className=" d-flex post__comment">
  <img src="images/photo.jpg" className=" post__avatar" />  
  <form onSubmit={
    (e) => {
      e.preventDefault();
      props.comment(e.target[0].value);
    }
  }>
  <input type="text" className="post__comment-input round-box"  placeholder=" Comment Something"/>
  </form>

</div>



</div>


</div>


  </div>  
  </div>  
  </div>  
     )


    )
}


export default Post;