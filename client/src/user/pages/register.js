import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import '../style/register.css'


function Register(){

  return(
		<Container className="position-absolute top-50 start-50 translate-middle login-page">
			<Row className="justify-content-center">
				<Col md={6}>
			<Card className="text-center">
				<Card.Body className="p-0">
					<Row className="justify-content-center">
						<Col xs={12} md={8} className="my-auto px-5">
							<Card.Title className="my-5"><h2>CEUMatch</h2></Card.Title>
							<Form >
								<Row className="justify-content-center">
									<Col md={12}>
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
										<p className="fs-6 mb-3 text-start !important">Quais esportes você pratica?</p>
										<InputGroup className="mb-4">
											<Form.Check className="mx-1" aria-label="option 1" label="Futsal"/>
											<Form.Check className="mx-1" aria-label="option 2" label="Vôlei"/>
											<Form.Check className="mx-1" aria-label="option 3" label="Basquete"/>
											<Form.Check className="mx-1" aria-label="option 4" label="Handebol"/>
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon2">
												<FontAwesomeIcon icon={faLock} />
											</InputGroup.Text>
											<Form.Control
												required
												type="password"
												placeholder="Senha"
												aria-label="Senha"
												aria-describedby="basic-addon2"
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid">Senha inválida</Form.Control.Feedback>
										</InputGroup><InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon3">
												<FontAwesomeIcon icon={faLock} />
											</InputGroup.Text>
											<Form.Control
												required
												type="password"
												placeholder="Confirme a Senha"
												aria-label="Senha"
												aria-describedby="basic-addon3"
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