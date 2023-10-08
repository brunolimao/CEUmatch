import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faArrowLeft, faA, faCalendarDays, faLocationPin} from '@fortawesome/free-solid-svg-icons'
import NavbarHome from "../../components/NavbarHome";

import '../../user/style/register.css'


function UpdateMatch(){
	const { id } = useParams()
  const [ matchObject, setMatchObject ] = useState({});
	

	useEffect(() => {
		axios.get(`http://localhost:3001/matches/updatematch/${id}`, {headers:{token: sessionStorage.getItem("token")}}).then((response) => {
			setMatchObject(response.data);
		});
	}, []);

	const navigate = useNavigate()
		
	const handleSubmit = async (e) => {

		e.preventDefault();

		const titleInput = document.getElementById("title");
		const dateInput = document.getElementById("matchDate");
		const courtInput = document.getElementById("matchCourt");
    const sportInput = document.getElementById("matchSport");


		const title = titleInput.value;
		const matchDate = dateInput.value;
		const matchCourt = courtInput.value;
    const matchSport = sportInput.value;


		try {
		  const response = await axios.post(`http://localhost:3001/matches/updatematch/${id}`, {
				title: title,
				matchDate: matchDate,
				matchCourt: matchCourt,
        matchSport: matchSport,
		  });
		  console.log(response.data);
		  navigate('/matches/usermatches');
		} catch (error) {
		  console.error(error);
		}

	}


  return(
		<><NavbarHome></NavbarHome>
		<Container className="position-absolute top-50 start-50 translate-middle login-page">
			<Row className="justify-content-center">
				<Col md={6}>
			<Card>
				<Card.Body className="p-0">
					<Row className="justify-content-start mt-3 mx-3">
						<Col>
							<Link to="/matches/usermatches/" style={{color: "black"}}>
								<FontAwesomeIcon icon={faArrowLeft} size="xl" className="mx-2"/>  Voltar
							</Link>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col xs={12} md={8} className="my-auto px-5">
							<Card.Title className="my-5 text-center"><h2>Editar Partida</h2></Card.Title>
							<Form onSubmit={handleSubmit}>
								<Row className="justify-content-center">
									<Col md={12}>
									<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon1">
												<FontAwesomeIcon icon={faA} />
											</InputGroup.Text>
											<Form.Control
												required
												type="text"
												placeholder="Título"
												aria-label="Título"
												aria-describedby="basic-addon1"
												id = "title"
												defaultValue={matchObject.title}
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon2">
												<FontAwesomeIcon icon={faCalendarDays} />
											</InputGroup.Text>
											<Form.Control
												required
												type="datetime-local"
												placeholder="Data"
												aria-label="Data"
												aria-describedby="basic-addon2"
												id = "matchDate"
												value= {moment(matchObject.matchDate).utc(-3).format("YYYY-MM-DDTHH:mm")}
												disabled
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon3">
												<FontAwesomeIcon icon={faLocationPin} />
											</InputGroup.Text>
											<Form.Control
												required
												type="text"
												placeholder="Quadra"
												aria-label="Quadra"
												aria-describedby="basic-addon3"
												id = "matchCourt"
												defaultValue= {matchObject.matchCourt}
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
										</InputGroup>
											<InputGroup className="mb-4">
											<InputGroup.Text id="basic-addon4">
												<FontAwesomeIcon icon={faFutbol} />
											</InputGroup.Text>
											<Form.Control
												required
												type="text"
												placeholder="Esporte"
												aria-label="Esporte"
												aria-describedby="basic-addon4"
												id = "matchSport"
												defaultValue= {matchObject.matchSport}
											/>
											<Form.Control.Feedback></Form.Control.Feedback>
											<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
										</InputGroup>
									</Col>
								</Row>
								<Row className="justify-content-center text-end mb-5 mt-3">
									<Col md={12}>
										<Button type="submit" className="px-4" variant="success">
											Editar
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
		</>
  )
}

export default UpdateMatch;