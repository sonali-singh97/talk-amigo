// import logo from './logo.svg';
import React from "react";
import {BrowserRouter } from 'react-router-dom';
import {Route} from "react-router";
import './App.css';
import Loginpage from './components/pages/Loginpage';
import SignupPage from './components/pages/SignupPage';
import FeedPage from './containers/FeedPage';
import Navbar from './components/Navbar';
import UserProfile from './components/pages/userprofile';
import CreatePost from "./containers/CreatePost";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("http://localhost:5000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}

render() {
  return (
    <BrowserRouter>
    <div className="App">
   <Navbar />
   <Route path="/"  exact component ={SignupPage} />
   <Route path="/login" exact component= {Loginpage} />
   <Route path="/feed" exact component= {FeedPage} />
   <Route path="/user_profile" exact component= {UserProfile} />
   <Route path="/create_post" exact component= {CreatePost} />

   <p className="App-intro">;{this.state.apiResponse}</p>
    </div>
    </BrowserRouter>
  );
}
}




export default App;
