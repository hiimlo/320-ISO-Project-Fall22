import React from 'react';
import './App.css';
import { Scatter } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Link } from "react-router-dom";
//Chart.register(CategoryScale);


const data = require('./localhost.json');

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {node: '.I.KENT    345 2'};
    this.changeNode = this.changeNode.bind(this);
  }

  changeNode(event, name) {
    this.setState({
      node: name
    })
  }

  createGraphState() {
    const nodeName = this.state.node;
    let node = data.filter(function (e) {
      if (nodeName === e.pnode_name) {
        return e;
      }
    })
    
    let dataPoint = node.map(function (e) {
      return {
        x: e.period_id.charCodeAt(e.period_id.length - 1) - 48,
        y: e.lmp
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
    return (
      <div className="App-header">
        <Link className="App-link" to="/home">Go Home</Link>
        <div className="Alert">NOTE: this is dummy for a proof of concept</div>
        <button onClick = {event => this.changeNode(event, '.I.KENT    345 2')}>.I.KENT    345 2</button>
        <button onClick = {event => this.changeNode(event, '.I.PARKCITY345 1')}>.I.PARKCITY345 1</button>
        <button onClick = {event => this.changeNode(event, '.I.VICTORIA345 1')}>.I.VICTORIA345 1</button>
        <div>{this.state.node}</div>
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
                beginAtZero: true,
              }
            }
          }} />
      </div>

    );
  }
}
//Graph.register(CategoryScale);