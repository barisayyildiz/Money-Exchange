import logo from './logo.svg';
import './App.scss';

import LoginForm from './components/Login'
import SignupForm from './components/SignupPage'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ExchangeModal from './components/ExchangeModal'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
			{/* <LoginForm></LoginForm> */}
			{/* <SignupForm></SignupForm> */}
			{/* <Navbar></Navbar> */}
			{/* <SearchBar></SearchBar> */}
			{/* <ExchangeModal></ExchangeModal> */}


			<Switch>
				<Route exact path="/login">
					<LoginForm></LoginForm>
				</Route>
				<Route path="/signup">
					<SignupForm></SignupForm>
				</Route>
			</Switch>

    </div>
  );
}

export default App;
