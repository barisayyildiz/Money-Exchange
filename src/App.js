import React from 'react';
import './App.scss';

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
					render={({location:{pathname}}) => {
						if(user){
							return <Redirect	to={{pathname: "/"}}/>
						}else if(pathname === '/login'){
							return <LoginForm></LoginForm>
						}else if(pathname === '/signup'){
							return <SignupForm></SignupForm>
						}
					}}
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
