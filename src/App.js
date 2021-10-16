import logo from './logo.svg';
import './App.scss';

import LoginForm from './components/Login'
import SignupForm from './components/SignupPage'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <div className="App">
			{/* <LoginForm></LoginForm> */}
			{/* <SignupForm></SignupForm> */}
			{/* <Navbar></Navbar> */}
			<SearchBar></SearchBar>

    </div>
  );
}

export default App;
