import React,{useState, useEffect} from "react";

import Friend from "../components/Friend";

function SuggestionPage() {
    const [userList , setList] = useState(null);


    useEffect(()=>{
        fetch("/suggested-users" , {
         headers: {
           authorization: "Bearer " + localStorage.getItem("jwt"),
         }
        })
        .then(res=>res.json())
        .then(list =>{
         
          setList(list.user);
        })
        .catch((err) => {
         console.log(err);
       });
       },[])

    return(
        <div className=" below-navbar stardust-bg">
            <div className="row ">
            <div className="offset-md-3 col-md-6 offset-sm-2 col-sm-8  suggestion-page-list">
            {userList && userList.map(user =>
               { 
                  return   <Friend key={user._id} user={user}/>
                })} 
              
              </div>
            </div>
        </div>
    )
}

export default SuggestionPage;