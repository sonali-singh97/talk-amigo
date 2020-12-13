// import logo from './logo.svg';

import {BrowserRouter } from 'react-router-dom';
import {Route} from "react-router";
import './App.css';
import Loginpage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import FeedPage from './containers/FeedPage';
import Navbar from './components/Navbar';
import UserProfile from './pages/userprofile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">

      {/* <Loginpage /> */}
      {/* <SignupPage /> */}
     {/* <Navbar />
     <FeedPage />
       */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
   <Route path="/"  exact component ={SignupPage} />
   <Route path="/login" exact component= {Loginpage} />
   <Route path="/feed" exact component= {FeedPage} />
   <Route path="/user_profile" exact component= {UserProfile} />
  

    </div>
    </BrowserRouter>
  );
}

export default App;
