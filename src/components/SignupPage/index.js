import React, { useState } from 'react'
import './style.scss'

import { useHistory } from "react-router-dom";
import { Row, Col, InputGroup, Alert, Button, Form } from 'react-bootstrap';
import { getAllUsers } from '../../utils'

function SignUp() {

	let history = useHistory();
	
  const [validated, setValidated] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
		setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
			const users = getAllUsers();

			if(password.length < 6){
				setAlertMessage("Password is too short...")
				event.preventDefault();
 		  	event.stopPropagation();
			}else if(users.find(user => user.username===username)){
				setAlertMessage("Username is already taken...")
				event.preventDefault();
 		  	event.stopPropagation();
			}else{
				const newUser = {
					username,
					password,
					money:[
						{
							acrn:"USD",
							name:"United States Dollar",
							amount:10000,
							favourite:false
						}
					]
				}
				if(users){
					localStorage.setItem("users", JSON.stringify([...users, newUser]))
				}else{
					localStorage.setItem("users", JSON.stringify([newUser]))
				}
				history.push("/login");
			}			
		}
  };

  return (
		<div className="form-wrapper"> 
			<h2>Signup Form</h2>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Col>
					<Form.Group as={Row} controlId="validationCustomUsername">
						<InputGroup hasValidation>
							<Form.Control
								type="text"
								placeholder="Username"
								aria-describedby="inputGroupPrepend"
								required
								onChange={({target:{value}}) => setUsername(value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please choose a username.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<Form.Group as={Row} controlId="validationPassword">
						<InputGroup hasValidation>
							<Form.Control
								type="password"
								placeholder="Password"
								aria-describedby="inputGroupPrepend"
								required
								onChange={({target:{value}}) => setPassword(value)}
							/>
							<Form.Control.Feedback type="invalid">
								Please choose a password.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Button className="mb-3" type="submit">Submit form</Button>
				</Col>
			</Form>

			<Alert
				variant="danger"
				show={Boolean(alertMessage)}
			>{alertMessage}</Alert>

			<a href="/login">Already have an account?</a>
		</div>
  );
}

export default SignUp
