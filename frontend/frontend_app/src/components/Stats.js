import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddFilter } from './AddFilter.js';

// Just for proof of concept before we connect to the API
const data = require('../localhost.json');
const nodeList = data.map(x => x.pnode_name);

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: data,
      filters: []
      //nodes: nodeList,
      // dates: ["day1", "day2", "day3", "day4"],
    }
    this.addFilter = this.addFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  addFilter(filter) {
    this.setState({
      filters: [...this.state.filters, filter]
    })
  }

  clearFilters() {
    this.setState({
      filters: []
    })
  }

  filterItems(filters) {
    return this.state.dataset.filter(node => {
      for(var i = 0; i < filters.length; i++)
        if(node[filters[i][0]] !== filters[i][1])
          return false;
      return true;
    })
  }

  
  render() {
    return (
      <div className="App">
        <div className="sub-header">
          <Link className="App-link" to="/home">Go Home</Link>
        </div>
        <AddFilter addFilter={this.addFilter}/>
        <button onClick={this.clearFilters}>Clear</button>
        <div className="rowC">
          {/* <DropdownButton className="DropdownButton" title="Node" >
            {this.state.nodes.map(node =>
              <li key = {node.toString()}>
                <Dropdown.Item className="DropdownItem" as="button">
                  {node}
                </Dropdown.Item>
              </li>
            )}
          </DropdownButton> */}
          {/* <DropdownButton className="DropdownButton" title="Date" >
            {this.state.dates.map(node =>
              <li key = {node.toString()}>
                <Dropdown.Item className="DropdownItem" as="button">
                  {node}
                </Dropdown.Item>
              </li>
            )}
          </DropdownButton> */}
        </div>
        <div className='left'>
          {this.state.filters.map(filter => 
            <li>
              {filter}
            </li>)}
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


