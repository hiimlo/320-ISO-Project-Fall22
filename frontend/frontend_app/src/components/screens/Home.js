import isologo from '../../images/ISO Logo clear.png'
import '../../App.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={isologo} className="iso-App-logo" alt="logo" />

                <p className="title">Welcome</p>
                <br></br>
                <div className="stackRow">
                    <Link className="App-link" to="/uc1">
                        Sanity Check
                    </Link>
                    <Link className="App-link" to="/uc2">
                        Report on a Scenario
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
