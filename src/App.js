import logo from './logo.svg';
import './App.scss';

import LoginForm from './components/Login'
import SignupForm from './components/SignupPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
			{/* <LoginForm></LoginForm> */}
			{/* <SignupForm></SignupForm> */}
			<Navbar></Navbar>
			
    </div>
  );
}

export default App;
