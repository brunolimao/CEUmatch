import React from "react";
import '../style/matches.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import { useNavigate } from 'react-router-dom'
import NavbarHome from "../../components/NavbarHome";

function UserMatches() {

  const [listOfMatches, setListOfMatches] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/matches/usermatches/`, {headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      setListOfMatches(response.data);
    });
  }, []);

  const deleteMatch = async (e) => {

    e.preventDefault();

    const idInput = document.getElementById("id");
	
		const id = idInput.value;

    try {
		  await axios.delete(`http://localhost:3001/matches/deleteMatch/${id}`, {headers:{token: sessionStorage.getItem("token")}}, {
			  withCredentials: true,
		})
      alert("Partida deletada com sucesso")
      axios.get(`http://localhost:3001/matches/usermatches/`, {headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      setListOfMatches(response.data);
    });
		} catch (error) {
		  console.error(error);
		}

  }

  return (
    <><NavbarHome></NavbarHome>
    <div className="Matches"> 
      {listOfMatches.map((value, key) => { 
        return (    
          <div className="match" key={key}>
            <Form onSubmit={deleteMatch}>
            <input type="hidden" id="id" name="matchId" value={value.id}/>
            <Card >
              <Card.Header className="text-center" as="h2">
                {value.title}
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-center" as="h4">
                  {value.matchSport} - {value.matchCourt}
                </Card.Title>
                <Row className="text-center">
                  <Card.Text as="h6">
                    {moment(value.matchDate).utc(-3).format('DD/MM/YYYY - HH:mm')}
                  </Card.Text>
                </Row>
                <Row className="justify-content-center">
                  <Card.Text as="h5">
                    (Lista de participantes)
                  </Card.Text>
                </Row>
                <Row className="justify-content-center text-end mt-3">
									<Col md={12}>
                    <Button className="px-4" variant="primary" onClick={() => navigate(`/matches/updatematch/${value.id}`)}>
                          Editar
                    </Button>
                    <Button className="px-4" type='submit' variant="danger" >
                          Excluir
                    </Button>
                    <Button className="px-4" variant="secondary" onClick={() => navigate(`/matches/requests/${value.id}`)}>
                          Solicitações
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            </Form>
          </div>
        );
      })}
      <Row className="position-absolute top-40">
        <Button className="px-4" variant="success" onClick={() => navigate('/matches/creatematch')}>
          Criar Partida
        </Button>
      </Row>
    </div>
    </>
  );
}

export default UserMatches;