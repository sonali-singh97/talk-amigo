// import logo from './logo.svg';
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, useHistory, Switch } from "react-router-dom";
import { Route } from "react-router";
import Loginpage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import FollowingPosts from "./pages/followingPosts";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/userprofile";
//import Profile from "./components/Profile";
import Profile from "./components/profile/index";
import CreatePost from "./pages/CreatePost";
import Resetpage from "./pages/Reset";
import Newpassword from "./pages/Newpassword";
import SuggestionPage from './pages/SuggestionPage';
import {reducer, initialState} from "./reducers/userReducer";
import './App.css';


export const UserContext = createContext();

const Routes = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith("/reset"))
        history.push("/login");
    }
  }, []);

return(
  <Switch>
  <Route path="/signup"  exact component ={SignupPage} />
  <Route path="/login" exact component= {Loginpage} />
  <Route path="/" exact component= {FollowingPosts} />
  <Route path="/explore" exact component= {FeedPage} />
  <Route path="/user/:userId" exact component= {Profile} />
    <Route path="/user_profile" exact component= {UserProfile} />
  <Route path="/create_post" exact component= {CreatePost} />
  <Route path ="/reset" exact component = {Resetpage} />
  <Route path = "/reset/:token" component={Newpassword}></Route>
  <Route path="/suggestion_page" exact component= {SuggestionPage} />

  </Switch>
)
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
     
        <div className=" stardust-bg container-fluid">
        <Navbar />

          <Routes />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { apiResponse: "" };
// }

// callAPI() {
//     fetch("/testAPI")
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
