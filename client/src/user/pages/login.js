import React from "react";
import axios from "axios";
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import CeuImage from '../../public/ceu.jpg'
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import "../style/login.css"


function Login(){

	const [popShow, setpopShow] = useState(false);
	const [modalInfo, setModalInfo] = useState([false]);

	const navigate = useNavigate()

  const handleSubmit = async (e) => {

		e.preventDefault();

		const emailInput = document.getElementById("email");
		const passwordInput = document.getElementById("password");

		const email = emailInput.value;
		const password = passwordInput.value;

		try {
		  const response = await axios.post('http://localhost:3001/users/login', {
				email: email,
				password: password,
		  }, {
			  withCredentials: true,
		})
			sessionStorage.setItem("token", response.data)
			navigate('/matches');
		} catch (error) {
			setpopShow(true)
			setModalInfo(error.response.data.error)
		}

		
  };

  return(
		<Container className="position-absolute top-50 start-50 translate-middle login-page">
			

			<Card className="text-center">
				<Card.Body className="p-0">
					<Row>
						<Col xs={12} md={6} className="my-auto px-5">
							<Card.Title className="my-5"><h2>CEUMatch</h2></Card.Title>
							<Form onSubmit={handleSubmit}>
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
												id = "email"
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
												id = "password"
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
										<p>Não possui uma conta? <Link to="/register">Registre-se aqui.</Link></p>
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
			<Modal
        size="sm"
        show={popShow}
        onHide={() => setpopShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Aviso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalInfo}</Modal.Body>
      </Modal>



		</Container>
  )
}

export default Login;