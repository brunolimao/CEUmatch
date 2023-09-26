import React from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import '../style/register.css'


function Register(){

	const navigate = useNavigate()

	const handleSubmit = async (e) => {

		e.preventDefault();

		const nameInput = document.getElementById("name");
		const emailInput = document.getElementById("email");
		const passwordInput = document.getElementById("password");


		const name = nameInput.value;
		const email = emailInput.value;
		const password = passwordInput.value;

		try {
		  const response = await axios.post('http://localhost:3001/users/cadastro', {
				name: name,
				email: email,
				password: password,
		  });
		  console.log(response.data);
			navigate('/');
		} catch (error) {
		  console.error(error);
		}
	}

  return(
		<Container className="position-absolute top-50 start-50 translate-middle login-page">
			<Row className="justify-content-center">
				<Col md={6}>
			<Card>
				<Card.Body className="p-0">
					<Row className="justify-content-start mt-3 mx-3">
						<Col>
							<Link to="/" style={{color: "black"}}>
								<FontAwesomeIcon icon={faArrowLeft} size="xl" className="mx-2"/>  Voltar
							</Link>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col xs={12} md={8} className="my-auto px-5">
							<Card.Title className="my-5 text-center"><h2>CEUMatch</h2></Card.Title>
							<Form onSubmit={handleSubmit}>
								<Row className="justify-content-center">
									<Col md={12}>
									<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon1">
												<FontAwesomeIcon icon={faUser} />
											</InputGroup.Text>
											<Form.Control
												required
												type="text"
												placeholder="Nome"
												aria-label="Nome"
												aria-describedby="basic-addon1"
												id = "name"
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon2">
												<FontAwesomeIcon icon={faEnvelope} />
											</InputGroup.Text>
											<Form.Control
												required
												type="email"
												placeholder="Email"
												aria-label="Email"
												aria-describedby="basic-addon2"
												id = "email"
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid">Email inválido</Form.Control.Feedback>
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon3">
												<FontAwesomeIcon icon={faLock} />
											</InputGroup.Text>
											<Form.Control
												required
												type="password"
												placeholder="Senha"
												aria-label="Senha"
												aria-describedby="basic-addon3"
												id = "password"
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid">Senha inválida</Form.Control.Feedback>
										</InputGroup>
									</Col>
								</Row>
								<Row className="justify-content-center text-end mb-5 mt-3">
									<Col md={12}>
										<Button type="submit" className="px-4" variant="success">
											Cadastrar
										</Button>
									</Col>
								</Row>
								
								
							</Form>
							
						</Col>
					
					</Row>
				</Card.Body>
			</Card>
			</Col>
			</Row>


		</Container>
  )
}

export default Register;