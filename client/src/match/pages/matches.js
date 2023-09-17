import '../style/matches.css';
import axios from "axios";
import { useEffect, useState} from 'react';


function Matches() {

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/matches").then((response) => {
      setListOfPosts(response.data);
      console.log(response.data)
    });
  }, []);
  return (
    <div className="Matches"> 
      {listOfPosts.map((value, key) => { 
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

export default Matches;