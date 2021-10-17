import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.scss';

import { Context, ContextProvider } from './context'

import LoginForm from './components/Login'
import SignupForm from './components/SignupPage'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ExchangeModal from './components/ExchangeModal'
import CurrencyTable from './components/CurrencyTable'
import MainMenu from './pages/MainMenu'

import {
	isAuthenticated,
	setAuthenticated,
	removeAuthenticated,
	getAllMonies
} from './utils'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
	Redirect
} from "react-router-dom";

function App() {
	
	const user = isAuthenticated();
	console.log(user)


  return (
		<ContextProvider>
			<div className="App">

				<Switch>
					<Route exact path='/login' component={ !user ? LoginForm : Navbar}></Route>
					<Route path='/signup' component={ !user ? SignupForm : Navbar}></Route>
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
						) : (
							<Redirect
							to={{
								pathname: "/login"
							}}
						/>
						)
					}
				</Switch>

			</div>
		</ContextProvider>
  );
}

export default App;
