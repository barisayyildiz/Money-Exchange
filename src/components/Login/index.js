import React, { useState } from 'react'
import './style.scss'

import { useHistory } from "react-router-dom";
import { setAuthenticated, getAllUsers } from '../../utils'
import { Row, Col, InputGroup, Alert, Form, Button } from 'react-bootstrap';



function FormExample() {

	let history = useHistory();

  const [validated, setValidated] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("")
	const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
		setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{

			const users = getAllUsers();
			const index = users.findIndex(user => user.username === username && user.password === password)
			if(index < 0){
				setAlertMessage("User not found...")
				event.preventDefault();
 		    event.stopPropagation();
			}else{
				setAuthenticated(index)
				history.push("/")
			}
		}

  };

  return (
		<div className="form-wrapper"> 
			<h2>Login Form</h2>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Col>
					<Form.Group as={Row} controlId="validationCustomUsername">
						{/* <Form.Label>Username</Form.Label> */}
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
						{/* <Form.Label>Password</Form.Label> */}
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

			<a href="/signup">Don't have an account?</a>
		</div>
  );
}

export default FormExample
