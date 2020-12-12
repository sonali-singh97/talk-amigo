// import logo from './logo.svg';

import {BrowserRouter } from 'react-router-dom';
import {Route} from "react-router";
import './App.css';
import Loginpage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import FeedPage from './containers/FeedPage';
import UserProfile from './pages/userprofile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

      {/* <Loginpage /> */}
      {/* <SignupPage /> */}
   <Route path="/"  exact component ={SignupPage} />
   <Route path="/login" exact component= {Loginpage} />
   <Route path="/feed" exact component= {FeedPage} />
   <Route path="/user_profile" exact component= {UserProfile} />
  

    </div>
    </BrowserRouter>
  );
}

export default App;
