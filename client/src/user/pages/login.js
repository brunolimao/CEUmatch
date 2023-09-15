import React from "react";
import { useState } from 'react';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import CeuImage from '../../public/ceu.jpg'
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import "../style/login.css"


function Login(){
	const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return(
		<Container className="position-absolute top-50 start-50 translate-middle login-page">
			

			<Card className="text-center">
				<Card.Body className="p-0">
					<Row>
						<Col xs={12} md={6} className="my-auto px-5">
							<Card.Title className="my-5"><h2>CEUMatch</h2></Card.Title>
							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Row className="justify-content-center">
									<Col md={6}>
										<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon1">
												<FontAwesomeIcon icon={faEnvelope} />
											</InputGroup.Text>
											<Form.Control
												required
												type="email"
												placeholder="Email"
												aria-label="Email"
												aria-describedby="basic-addon1"
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid">Email inválido</Form.Control.Feedback>
										</InputGroup>
										<InputGroup className="mb-3">
											<InputGroup.Text id="basic-addon1">
											<FontAwesomeIcon icon={faLock} />
											</InputGroup.Text>
											<Form.Control
												required
												type="password"
												placeholder="Senha"
												aria-label="Senha"
												aria-describedby="basic-addon1"
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid">Senha inválida</Form.Control.Feedback>
										</InputGroup>
									</Col>
								</Row>
								<Row className="justify-content-center text-end mb-5 mt-3">
									<Col md={6}>
										<Button type="submit" className="px-4" variant="success">
											Entrar
										</Button>
									</Col>
								</Row>
								<Row className="justify-content-center mb-5">
									<Col md={6}>
										<h8>Não possui uma conta? <Link to="/register">Registre-se aqui.</Link></h8>
									</Col>
								</Row>
								
							</Form>
							
						</Col>
						<Col sm={12} md={6}>
							<Image className="w-100 h-100" src={CeuImage} />
						</Col>
					</Row>
      	</Card.Body>
    	</Card>



		</Container>
  )
}

export default Login;