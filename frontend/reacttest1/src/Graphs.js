import React from 'react';
import './App.css';
import {Scatter} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }    from 'react-chartjs-2'
import { Link } from "react-router-dom";
//Chart.register(CategoryScale);

const data = require('./localhost.json');
let _id = data.map(function(e) {return e._id});
let scenario_id = data.map(function(e) {return e.scenario_id});
let pnode_name = data.map(function(e) {return e.pnode_name});
let period_id = data.map(function(e) {return e.period_id});
let lmp = data.map(function(e) { return e.lmp});
let kent = data.filter(function(e) {
  if (e.pnode_name == ".I.KENT    345 2") {
    return e;
  } 
})

let dataPoint = kent.map(function(e) {
  return {
    x : e.period_id.charCodeAt(e.period_id.length-1)-48, 
    y: e.lmp
   
  }
})
const state = {
  labels: pnode_name,
  datasets: [
    {
      label: 'Nodes',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: dataPoint,
      options: {
        scales: {
          x: {
            
            position: 'bottom'
          },
          y: {
            type: 'linear',
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, ticks) {
                  return 'Day ' + value;
              }
          }
          }
        }
      }
    }
  ]
}

export default class Graph extends React.Component {
  render() {
    return (
      <div className="App-header">
      <Link className="App-link" to="/home">Go Home</Link>
          <Scatter
            data={state}
            options={{
              title: {
                display: true,
                text: 'LMP Of Nodes',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }} />
        </div>
        
    );
  }
}
//Graph.register(CategoryScale);