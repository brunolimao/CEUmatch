import React from "react";
import axios from "axios";
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



function Teste(){
    const [listOfMatches, setListOfMatches] = useState([]);

  useEffect(() => {
    //axios.get(`http://localhost:3001/auth/matches/usermatches/${id}`).then((response) => {
    axios.get('http://localhost:3001/users/welcome/',{headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      console.log(response.data)
      setListOfMatches(response.data);
    });
  }, []);
  return (
    <div className="Matches"> 
      {listOfMatches.name}    
          <div className="match">
            <Card >
              <Card.Header className="text-center" as="h2">
                
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-center" as="h4">
                  
                </Card.Title>
                <Row className="text-center">
                  <Card.Text as="h6">
                    
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
    </div>
  );
}

export default Teste;