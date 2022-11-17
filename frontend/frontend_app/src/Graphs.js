import React from 'react';
import { useState } from 'react'
import './App.css';
import { Scatter } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';

import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "react-apexcharts";
import Heat from './HeatMap';
import Histo from './Histogram';

//Chart.register(CategoryScale);


//const data = require('./localhost.json');
//console.log(data);
//const nodeList = data.map(x => x.pnode_name);

const scenario = 3;
const url = 'http://localhost:3000/scenarios/'+scenario+'/nodes';

async function fetchJson(url) {
  const response = await fetch(url)
  .then(response => response.json())
  .then(nodes => nodes)
    .catch((err) => {
        console.log("LMPERR"+err.message);
    });
  
  //console.log(response);
  return await response;
}

// Alex first push
export default class Graph extends React.Component {

  constructor(props) {
    super();
    this.state = {
        error: null,
        isLoaded: false,
        chartData: [],
        node: 'UN.ALTA    345 UALT',
        nodeList: [],
    };
    this.changeNode = this.changeNode.bind(this);
}

getChartData = () => {
    fetchJson(url)
        .then(
            (result) => {
                //console.log(result);
                this.setState({
                    isLoaded: true,
                    chartData: result,
                    nodeList: Object.keys(result)
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        );
};

componentDidMount() {
    this.getChartData();
}
  

  changeNode(event, name) {
    this.setState({
      node: name
    })
  }

  createGraphState() {
    const nodeName = this.state.node;
    let node = this.state.chartData[nodeName];
    //console.log(node);
    let dataPoint = node.map(function (e) {
      return {
        x: ((e.PERIOD_ID.charCodeAt(11)-48)*10)+e.PERIOD_ID.charCodeAt(12)-48,
        y: e.LMP
      }
      
     
    })

    const graphState = {
      labels: node,
      datasets: [
        {
          label: 'Nodes',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: dataPoint,
        }
      ]
    }
    return graphState;
  }
  render() {
    if (this.state.error){
      return <div> ERRORRRRR </div>
    } else if (!this.state.isLoaded){
      return (
        <div className = "App-header" >
        <div className = "Alert"> LOADINGGG </div>
        </div>
      )
    } else {
    return (
      <div className = "contain">
        <div className="sub-header">
          <Link className="App-link" to="/home">Go Home</Link>
          
        </div>
        
        <div className = "center">
        <div className = "title">{this.state.node}</div>
        <DropdownButton className="DropdownButton" title="DROP" >
          {this.state.nodeList.map(node =>
          <li key = {node.toString()}>
            <Dropdown.Item className="DropdownItem" as="button" onClick={event => this.changeNode(event, node)}>
              {node}
            </Dropdown.Item>
          </li>
          )}
        </DropdownButton>
         <Scatter className="Grapher"
            data={this.createGraphState()}
            options={{
              title: {
                display: true,
                text: 'LMP Of Nodes',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              },
              scales: {
                x: {
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                      return 'Day ' + value;
                    }
                  },
                  position: 'bottom'
                },
                y: {
                  beginAtZero: false,
                }
              }
           }}/>
           </div>
           <div className = "contain">
            <div className = "right"><Heat /></div>
            <div className = "left"> <Histo /></div>
           
        </div>
      </div>
    );
  }
}
}
//Graph.register(CategoryScale);