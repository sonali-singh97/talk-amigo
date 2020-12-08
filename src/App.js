// import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/Loginpage';
import SignupPage from './pages/SignupPage';
import FeedPage from './containers/FeedPage';

function App() {
  return (
    <div className="App">

      {/* <Loginpage /> */}
      {/* <SignupPage /> */}

     <FeedPage />

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
    </div>
  );
}

export default App;
