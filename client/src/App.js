// import logo from './logo.svg';
import React, {useEffect, createContext, useReducer, useContext} from "react";
import {BrowserRouter, useHistory,Switch } from 'react-router-dom';
import {Route} from "react-router";
import Loginpage from './components/pages/Loginpage';
import SignupPage from './components/pages/SignupPage';
import FeedPage from './containers/FeedPage';
import Navbar from './components/Navbar';
import UserProfile from './components/pages/userprofile';
import Profile from './components/Profile';
import CreatePost from "./containers/CreatePost";
import {reducer, initialState} from "./reducers/userReducer";
import './App.css';

export const UserContext = createContext();

const Routes=() => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
   
    if(user){
      dispatch({type:"USER", payload : user});
    
    }
    else{
      history.push("/signup");
    }
  }, []);

return(
  <Switch>
  <Route path="/signup"  exact component ={SignupPage} />
  <Route path="/login" exact component= {Loginpage} />
  <Route path="/" exact component= {FeedPage} />
  <Route path="/user/:userId" exact component= {Profile} />
    <Route path="/user_profile" exact component= {UserProfile} />
  <Route path="/create_post" exact component= {CreatePost} />
  </Switch>
)
}

const App =()=> {
  const [state, dispatch] = useReducer(reducer, initialState);
return(
   <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
    <div className="App">
   <Navbar />
  
    <Routes />
  
    </div>
    </BrowserRouter>
    </UserContext.Provider>
  
)
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "" };
// }

// callAPI() {
//     fetch("http://localhost:5000/testAPI")
//         .then(res => res.text())
//         .then(res => this.setState({ apiResponse: res }));
// }

// componentWillMount() {
//     this.callAPI();
// }

// render() {
//   return (
//     <BrowserRouter>
//     <div className="App">
//    <Navbar />
  
//     <Routes />
//    <p className="App-intro">;{this.state.apiResponse}</p>
//     </div>
//     </BrowserRouter>
//   );
// }
// }




export default App;
