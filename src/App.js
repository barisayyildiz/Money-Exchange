import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/Login'
import SignupForm from './components/SignupPage'
import MainMenu from './pages/MainMenu'

import {
	isAuthenticated,
} from './utils'

import {
  Switch,
  Route,
	Redirect
} from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route
					path={['/login', '/signup']}
					render={({location:{pathname}}) => {
						if(isAuthenticated()){
							return <Redirect	to={{pathname: "/"}}/>
						}else if(pathname === '/login'){
							return <LoginForm></LoginForm>
						}else if(pathname === '/signup'){
							return <SignupForm></SignupForm>
						}
					}}
				>
				</Route>
				<Route path="/">
					{
						isAuthenticated() ? <MainMenu></MainMenu> : <LoginForm></LoginForm>
					}
				</Route>
			</Switch>
		</div>
  );
}

export default App;
