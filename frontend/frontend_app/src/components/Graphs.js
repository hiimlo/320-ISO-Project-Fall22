import React from 'react';
import { useState } from 'react'
import '../App.css';
import { Scatter } from 'react-chartjs-2';


import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

import Heat from './charts/HeatMap';
import Histo from './charts/Histogram';
import Area from './charts/AreaChart'
import ApiWrapper from '../util/ApiWrapper'
//Chart.register(CategoryScale);


//const data = require('./localhost.json');
//console.log(data);
//const nodeList = data.map(x => x.pnode_name);

let scenario = 2;
let scenarioOther = 3;
const url = 'http://localhost:3000/scenarios/' + scenario + '/nodes' + '/PNODE_NAME' + '?id=' + encodeURIComponent('UN.ALTA    345 UALT');
const url2 = 'http://localhost:3000/scenarios/' + scenarioOther + '/nodes' + '/PNODE_NAME' + '?id=' + encodeURIComponent('UN.ALTA    345 UALT');
async function fetchJson(url) {
  const response = await fetch(url)
    .then(response => response.json())
    .then(nodes => nodes)
    .catch((err) => {
      console.log("LMPERR" + err.message);
    });

  //console.log(response['NODES']);
  return await response['NODES'];
}

// Alex first push
export default class Graph extends React.Component {

  constructor(props) {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      chartData: [],
      otherChartData: [],
      node: 'UN.ALTA    345 UALT',
      nodeList: [],
    };
    this.changeNode = this.changeNode.bind(this);
  }

  getChartData = () => {
    ApiWrapper.getDatafromApiAsync(this.state.node, scenario)
      .then(
        (response) => {
          console.log('r1: ');
          console.log(response)
          this.setState({
            chartData: response.map((n) => n.LMP),
            //nodeList: Object.keys(response)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

      ApiWrapper.getDatafromApiAsync(this.state.node, scenarioOther)
      .then(
        (response) => {
          console.log('r2: ');
          console.log(response)
          this.setState({
            isLoaded: true,
            otherChartData: response.map((n) => n.LMP),
            //nodeList: Object.keys(response)
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
    console.log(this.state)
  }


  changeNode(event, name) {
    this.setState({
      node: name
    })
  }

  createGraphState() {
    //console.log(this.state)
    const nodeName = this.state.node;
    // let nodeList = this.state.nodeList;
    // console.log(nodeName, nodeList)
    // //console.log(otherNode);

    // let cur = 0;
    // let dataPoint = nodeList.map(function (e) {
    //   return {
    //     x: this.state.chartData[e].LMP,
    //     y: this.state.otherChartData[e].LMP
    //   }


    // })
    let dataPoint = this.state.chartData.map((e, i) => {
      return {
        x: e,
        y: this.state.otherChartData[i]
      }
    })
    // console.log(dataPoint.x)
    // console.log(dataPoint.y)

    const graphState = {

      labels: nodeName,
      datasets: [
        {
          label: 'LMP By Hour',
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
    if (this.state.error) {
      return <div> ERRORRRRR </div>
    } else if (!this.state.isLoaded) {
      return (
        <div className="App-header" >
          <div className="Alert">  LOADING... </div>
        </div>
      )
    } else {
      return (
        <div className="contain">
          <div className="sub-header">
            <Link className="App-link" to="/home">Go Home</Link>

          </div>

          <div className="center">
            <div className="title">
              <div className="title">
                <div>LMP of Nodes </div>
                <div>(x axis = LMP of Scenario {scenarioOther}, y axis = LMP of Scenario {scenario})</div>
              </div>
              <div>{this.state.node}</div>
            </div>
            <DropdownButton className="DropdownButton" title="DROP" >
              {this.state.nodeList.map(node =>
                <li key={node.toString()}>
                  <Dropdown.Item className="DropdownItem" as="button" onClick={event => this.changeNode(event, node)}>
                    {node}
                  </Dropdown.Item>
                </li>
              )}
            </DropdownButton>
            <Scatter className="Grapher"
              data={this.createGraphState()}
              options={{
                Title: {
                  display: true,
                  text: 'LMP Of Nodes',
                  fontSize: 20,
                  padding: {
                    top: 10,
                    bottom: 30
                  }

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
                        return value;
                      }
                    },
                    position: 'bottom'
                  },
                  y: {
                    beginAtZero: false,
                  }
                }
              }} />
          </div>
          <div className="contain">
            <div className="right"><Heat /></div>
            <div className="left"> <Histo /></div>
            
          </div>
          <div><Area/></div>
        </div>
      );
    }
  }
}
//Graph.register(CategoryScale);