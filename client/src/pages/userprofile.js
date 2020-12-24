import React from 'react';

function UserProfile(){
    return(
        <div className="container">
            <div style={{display:"flex",
                        justifyContent:"space-around",
                        maxWidth:"700px",
                        margin:"18px auto",
                        borderBottom:"1px solid grey"}}>
                <div>
                    <img alt="" style={{width:"160px",height:"160px",borderRadius:"80px",paddingBottom:"10px "}}
                    src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"
                    />
                </div>
                <div>
                    <h3 style={{color:"white"}}>User Name</h3>
                    <div style={{display:"flex",
                                justifyContent:"space-between",
                                width:"108%",
                                color:"white",
                               
                                }}>
                        <h4>50 posts</h4>
                        <h4>50 followers</h4>
                        <h4>50 following</h4>
                    </div>
                </div>
            </div>

            <div className="Gallery">

              
                  <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 

                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 

                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 

                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 

                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 

                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 
                  
                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 
                <div className="img">
                  <img alt="" src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/> 
                </div> 

        
            
            </div>


        </div>
        )  
}

export default UserProfile;
