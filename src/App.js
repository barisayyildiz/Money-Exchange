import logo from './logo.svg';
import './App.scss';

import LoginForm from './components/Login'
import SignupForm from './components/SignupPage'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ExchangeModal from './components/ExchangeModal'

function App() {
  return (
    <div className="App">
			{/* <LoginForm></LoginForm> */}
			{/* <SignupForm></SignupForm> */}
			{/* <Navbar></Navbar> */}
			{/* <SearchBar></SearchBar> */}
			<ExchangeModal></ExchangeModal>

    </div>
  );
}

export default App;
