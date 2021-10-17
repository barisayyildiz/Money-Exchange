import React, { useState } from 'react'
import './style.scss'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, InputGroup } from 'react-bootstrap';


function SignUp() {

	let history = useHistory();
	
  const [validated, setValidated] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
			const users = JSON.parse(localStorage.getItem("users"));
			const newUser = {
				username,
				password,
				monies:[
					{
						acr:"USD",
						name:"United States Dollar",
						amount:10000
					},
					{
						acr:"TRY",
						name:"Turkish Lira",
						amount:50000
					}
				]
			}
			if(users){
				localStorage.setItem("users", JSON.stringify([...users, newUser]))
			}else{
				localStorage.setItem("users", JSON.stringify([newUser]))
			}
			history.push("/login");
			setValidated(true);
		}
  };

  return (
		<div className="form-wrapper"> 
			<h2>Signup Form</h2>
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
			<a href="/login">Already have an account?</a>
		</div>
  );
}

export default SignUp
