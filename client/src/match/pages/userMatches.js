import React from "react";
import '../style/matches.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import moment from "moment";


function UserMatches() {

  let { id } = useParams()
  const [listOfMatches, setListOfMatches] = useState([]);

  useEffect(() => {
    //axios.get(`http://localhost:3001/auth/matches/usermatches/${id}`).then((response) => {
    axios.get(`http://localhost:3001/matches/usermatches/${id}`).then((response) => {
      setListOfMatches(response.data);
    });
  }, []);
  return (
    <div className="Matches"> 
      {listOfMatches.map((value, key) => { 
        return (    
          <div className="match" key={key}>
            <Card >
              <Card.Header className="text-center" as="h2">
                {value.title}
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-center" as="h4">
                  {moment(value.matchDate).utc().format('DD/MM/YYYY')} - {value.matchSport}
                </Card.Title>
                <Row className="text-center">
                  <Card.Text as="h6">
                    {value.matchCourt}
                  </Card.Text>
                </Row>
                <Row className="justify-content-center">
                  <Card.Text as="h5">
                    (Lista de participantes)
                  </Card.Text>
                </Row>
                <Row className="justify-content-center text-end mt-3">
									<Col md={12}>
                    <Button type="submit" className="px-4" variant="primary">
                          Editar 
                    </Button>
                    <Button type="submit" className="px-4" variant="danger">
                          Excluir
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      <Row className="position-absolute top-40">
        <Button type="submit" className="px-4" variant="success">
          Criar Partida
        </Button>
      </Row>
      <Row className="position-absolute bottom-0">
        <Alert key={'success'} variant={'success'}>
          Fim das suas partidas
        </Alert>
      </Row>
    </div>
  );
}

export default UserMatches;