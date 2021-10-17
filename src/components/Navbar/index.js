import React from 'react'

import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { isAuthenticated, setAuthenticated, removeAuthenticated } from '../../utils'

import { useHistory } from "react-router-dom";

function MyNavbar() {

	const user = isAuthenticated();
	let history = useHistory();

	return (
		<div className="navbar-wrapper">
			<Navbar className="my-navbar" bg="light" expand="lg">
				<Container>
					<Navbar.Brand href="#home">Muni Frontend Challenge</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<div className="navbar-logout-wrapper" style={{
							display:'flex',
							flexDirection:'column'
						}}>
							<Navbar.Text>
								Signed in as: {user.username}
							</Navbar.Text>
							<Navbar.Text>
								<Link to="/login" onClick={() => {
									removeAuthenticated()
									history.push("/login");
								}}>Logout</Link>
							</Navbar.Text>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default MyNavbar
