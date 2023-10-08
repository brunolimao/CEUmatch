import React from "react";
import '../style/matches.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import { useNavigate } from 'react-router-dom'
import NavbarHome from "../../components/NavbarHome";

function UserMatches() {

  const [listOfMatches, setListOfMatches] = useState([]);
  const [popShow, setpopShow] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/matches/usermatches/`, {headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      setListOfMatches(response.data);
    });
  }, []);

  const deleteMatch = async (e, id) => {

    e.preventDefault();
    console.log(id)

    try {
		  await axios.delete(`http://localhost:3001/matches/deleteMatch/${id}`, {headers:{token: sessionStorage.getItem("token")}}, {
			  withCredentials: true,
		})
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
            <Form onSubmit={event => deleteMatch(event, value.id)}>
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
                <Row className="justify-content-center mt-2">
                  <Card.Text as="h6">
                    {value.participants.map((participant, secondkey) => { 
                      return (
                        <p key={secondkey}>
                          {secondkey+1}) {participant}
                        </p>
                      );

                    })}
                  </Card.Text>
                </Row>
                <Row className="justify-content-center text-end mt-3">
									<Col md={12}>
                    <Button className="px-4 mx-1" variant="primary" onClick={() => navigate(`/matches/updatematch/${value.id}`)}>
                          Editar
                    </Button>
                    <Button onClick={() => setpopShow(true)} className="px-4" type='submit' variant="danger">
                          Excluir
                    </Button>
                    
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            </Form>
          </div>
        );
      })}
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
        <Modal.Body>Partida excluída.</Modal.Body>
      </Modal>
    </div>
    </>
  );
}

export default UserMatches;