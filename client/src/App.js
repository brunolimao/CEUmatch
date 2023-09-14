import './App.css';
import axios from "axios";
import { useEffect, useState} from 'react';

function App() {

  const [listOfMatches, setListOfMatches] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/matches").then((response) => {
      setListOfMatches(response.data);
    });
  }, []);
  return (
    <div className="App"> 
      {listOfMatches.map((value, key) => { 
        return (
          <div className="match">
            <div className="title"> {value.title} </div>
            <div className="body"> {value.matchCourt} </div>
            <div className="footer"> {value.matchOwner} </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;