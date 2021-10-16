import React from 'react'

import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap'

function MyNavbar() {
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
								Signed in as: Mark Otto
							</Navbar.Text>
							<Navbar.Text>
								<a href="#login">Logout</a>
							</Navbar.Text>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default MyNavbar
