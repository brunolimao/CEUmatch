import React from "react";
import '../style/matches.css';
import axios from "axios";
import { useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from "moment";
import NavbarHome from "../../components/NavbarHome";


function Matches() {

  const [listOfMatches, setListOfMatches] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/matches/',{headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      console.log(response.data)
      setListOfMatches(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/users/join',{headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      console.log(response.data)
      setId(response.data);
    });
  }, []);

  const headers = {
    'token': sessionStorage.getItem("token")
  }

  const handleSubmit = async (e) => {

		e.preventDefault();

		const matchIdInput = document.getElementById("matchId");
    const matchOwnerIdInput = document.getElementById("matchOwnerId");

		const matchId = matchIdInput.value;
    const matchOwnerId = Number(matchOwnerIdInput.value);

		try {
		  const response = await axios.post('http://localhost:3001/users/join', {
        UserId: id,
        MatchId: matchId,
        matchOwner: matchOwnerId,
		  }, {
			  withCredentials: true,
		},{headers: headers})
			console.log(response.data);
		} catch (error) {
		  console.error(error);
		}

		
  };




  return (
    <><NavbarHome></NavbarHome>
    <div className="Matches"> 
      {listOfMatches.map((value, key) => { 
        return (    
          <div className="match" key={key}>
            <Form onSubmit={handleSubmit}>
              <input type="hidden" id="matchId" name="matchId" value={value.id}/>
              <input type="hidden" id="matchOwnerId" name="matchOwnerId" value={value.userId}/>
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
                    {moment(value.matchDate).utc().format('DD/MM/YYYY - HH:mm')}
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
            </Form>
          </div>
        );
      })}
    </div>
    </>
  );
}

export default Matches;