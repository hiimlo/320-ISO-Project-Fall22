//import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes, Navigate } from 'react-router-dom'

import Home from './components/screens/Home'
import UC1 from './components/screens/UC1'
import ShowData from './components/ShowData'
import UC2 from './components/screens/UC2'

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
                    <Route path="/uc1" element={<UC1 />} />

                    {/* This route is for about component 
      with exact path "/about", in component 
      props we passes the imported component*/}
                    <Route path="/uc2" element={<UC2 />} />

                    {/* If any route mismatches the upper 
      route endpoints then, redirect triggers 
      and redirects app to home component with to="/" */}
                    <Route path="/" element={<Navigate replace to="/home" />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
