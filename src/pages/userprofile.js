import React from 'react';

function UserProfile(){
    return(
        <div style={{maxWidth:"700px",margin:"0px auto"}}>
            <div style={{display:"flex",
                        justifyContent:"space-around",
                        margin:"18px 0px",
                        borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px",paddingBottom:"10px "}}
                    src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"
                    />
                </div>
                <div>
                    <h4 style={{color:"white"}}>User Name</h4>
                    <div style={{display:"flex",
                                justifyContent:"space-between",
                                width:"108%",
                                color:"white"
                                }}>
                        <h6>50 posts</h6>
                        <h6>50 followers</h6>
                        <h6>50 following</h6>
                    </div>
                </div>
            </div>

            <div className="Gallery">

              <div class="row"> 
                <div className="column">
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                </div>

                <div className="column">
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                   <img src="https://i1.wp.com/coolpictures.in/wp-content/uploads/2020/03/Cool-and-Stylish-DP-for-Girls.jpg?fit=586%2C586&ssl=1"/>
                </div>

        
              </div>
            </div>


        </div>
        )  
}

export default UserProfile;
