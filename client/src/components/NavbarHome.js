import Container from 'react-bootstrap/Container';
import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import '../style/NavbarHome.css'
import Col from 'react-bootstrap/esm/Col';

function NavbarHome() {

  const [id, setId] = useState([])
  const navigate = useNavigate()


  const handleClick = async(e) => {

		e.preventDefault();
		sessionStorage.removeItem("token")
		navigate("/")
	}


  useEffect(() => {
		axios.get(`http://localhost:3001/users/nav/`, {headers:{token: sessionStorage.getItem("token")}}).then((response) => {
      console.log("============")
      console.log(response.data)
			setId(response.data);
		});
	}, []);

  return (
    <Navbar bg="dark" collapseOnSelect expand="lg" data-bs-theme="dark" className='justify-content-between'>
    <Container>
        <Navbar.Brand className='my-auto' ><Link to="/matches" className='link'>CEUmatch</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-auto">
            <Nav.Link className='my-auto'><Link to="/matches/usermatches" className='link'>Minhas partidas</Link></Nav.Link>
            <Col col={5}>
            <Button className="py-2" variant="success">
              <Link to="/matches/createMatch" className='link'><FontAwesomeIcon icon={faPlus} className='mx-1' />Criar Partida</Link>
            </Button>
            </Col>
          </Nav>
        
        
      <Nav.Link className='my-3 mx-2'><Link to={`/users/profile/${id}`} className='link'> <FontAwesomeIcon icon={faCircleUser} size="2xl" className='mx-1'/>Perfil</Link></Nav.Link>
      <Button type="submit" className="px-4 mx-2" variant="danger" onClick={handleClick}>
        Sair
      </Button>
      </Navbar.Collapse>
      </Container>
        
      
    </Navbar>
  );
}

export default NavbarHome;