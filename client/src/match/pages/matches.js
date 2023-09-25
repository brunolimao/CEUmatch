import React from "react";
import '../style/matches.css';
import axios from "axios";
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from "moment";


function Matches() {

  const [listOfMatches, setListOfMatches] = useState([]);

  useEffect(() => {
    //axios.get(`http://localhost:3001/auth/matches/usermatches/${id}`).then((response) => {
    axios.get(`http://localhost:3001/matches/`).then((response) => {
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
                    <Button type="submit" className="px-4" variant="success">
                          Juntar-se 
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Matches;