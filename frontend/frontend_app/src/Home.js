import isologo from './images/ISO Logo clear.png';
//import logo from './images/logo.svg';
import './App.css';
import { Link } from "react-router-dom";



function Home() {
  return (
    
    <div className="App">
      <header className="App-header">
        
        <img src={isologo} className="iso-App-logo" alt="logo" />

        
        <p>
          Hello Team. Here's the landing page for our project.
        </p>
        <br></br>
        <div className = "stackRow">
        <Link className="App-link" to="/graph">Graph</Link>
        <Link className="App-link" to="/stats">Stats</Link>
        </div>
      </header> 
    </div>

   
  );
}

export default Home;
