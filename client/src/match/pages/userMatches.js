import '../style/matches.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

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
            <div className="title"> {value.title} </div>
            <div className="body"> {value.matchCourt} </div>
            <div className="footer"> {value.matchSport} </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserMatches;