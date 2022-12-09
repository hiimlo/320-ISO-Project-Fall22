import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: ["node1", "node2", "node3", "node4"],
      dates: ["day1", "day2", "day3", "day4"]
    }
  }

  render() {
    return (
      <div className="App">
        <div className="sub-header">
          <Link className="App-link" to="/home">Go Home</Link>    
        </div> 
        <div className = "rowC">
          <DropdownButton className="DropdownButton" title="Node" >
            {this.state.nodes.map(node =>
              <li key = {node.toString()}>
                <Dropdown.Item className="DropdownItem" as="button">
                  {node}
                </Dropdown.Item>
              </li>
            )}
          </DropdownButton>
          <DropdownButton className="DropdownButton" title="Date" >
            {this.state.dates.map(node =>
              <li key = {node.toString()}>
                <Dropdown.Item className="DropdownItem" as="button">
                  {node}
                </Dropdown.Item>
              </li>
            )}
          </DropdownButton>
        </div>
        <div className='centered'>
          <table>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>STDEV</td>
              <td>1</td>
            </tr>
            <tr>
              <td>MEAN</td>
              <td>1</td>
            </tr>
            <tr>
              <td>MODE</td>
              <td>1</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}
// function Stats () {
//     const nodes = ["node1", "node2", "node3", "node4"]
//     const dates = ["day1", "day2", "day3", "day4"]
//     return (
//       <div className="App">
//         <div className="sub-header">
//           <Link className="App-link" to="/home">Go Home</Link>    
//         </div> 
//         <div className = "rowC">
//           <DropdownButton className="DropdownButton" title="Node" >
//             {nodes.map(node =>
//               <li key = {node.toString()}>
//                 <Dropdown.Item className="DropdownItem" as="button">
//                   {node}
//                 </Dropdown.Item>
//               </li>
//             )}
//           </DropdownButton>
//           <DropdownButton className="DropdownButton" title="Date" >
//             {dates.map(node =>
//               <li key = {node.toString()}>
//                 <Dropdown.Item className="DropdownItem" as="button">
//                   {node}
//                 </Dropdown.Item>
//               </li>
//             )}
//           </DropdownButton>
//         </div>
//         <div className='centered'>
//           <table>
//             <tr>
//               <th>Statistic</th>
//               <th>Value</th>
//             </tr>
//             <tr>
//               <td>STDEV</td>
//               <td>1</td>
//             </tr>
//             <tr>
//               <td>MEAN</td>
//               <td>1</td>
//             </tr>
//             <tr>
//               <td>MODE</td>
//               <td>1</td>
//             </tr>
//           </table>
//         </div>
//       </div>
//     );
//   }

