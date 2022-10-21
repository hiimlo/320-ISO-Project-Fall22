//import './App.css';
import { BrowserRouter as Router,
   Switch, 
   Route,
   Routes,
   Navigate,} from "react-router-dom";

import Home from "./Home"
import Graph from "./Graphs"

function App() {
  return (
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    
    <Router>
      <Routes>
      {/* This route is for home component 
      with exact path "/", in component props 
      we passes the imported component*/}
      <Route path="/home" element={<Home />} />
      
        
      {/* This route is for about component 
      with exact path "/about", in component 
      props we passes the imported component*/}
      <Route path="/graph" element={<Graph />} />
     
    
        
      {/* If any route mismatches the upper 
      route endpoints then, redirect triggers 
      and redirects app to home component with to="/" */}
      <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>

    </Router>
    </>
  );
}

export default App;
