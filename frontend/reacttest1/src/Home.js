import isologo from './ISO Logo clear.png';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";



function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> + </p>
        <img src={isologo} className="iso-App-logo" alt="logo" />
        <p>
          Hello Team. Here's our REACT test.
        </p>
        <a
          className="App-link"
          href="https://los-angry-mob.atlassian.net/jira/software/projects/GA320/boards/1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lets head to our JIRA
        </a>
        <Link to="/graph">Graph</Link>
      </header> 
    </div>

   
  );
}

export default Home;
