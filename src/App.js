import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.scss';

import { Context, ContextProvider } from './context'

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
	const user = isAuthenticated();
	console.log(user)
  
	return (
		<div className="App">
			<Switch>
				<Route
					path={['/login', '/signup']}
					render={() => !user ? <LoginForm></LoginForm> : <Redirect	to={{pathname: "/"}}/>}
				>
				</Route>
				{
					// if user is authenticated
					user ? (
						<>
							<Route path='/'>
								<MainMenu
									user={user}
								></MainMenu>
							</Route>
						</>
					) : <Redirect	to={{pathname: "/login"}}/>
				}
			</Switch>
		</div>
  );
}

export default App;
