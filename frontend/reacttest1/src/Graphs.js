import React from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }    from 'react-chartjs-2'
//Chart.register(CategoryScale);

const data = require('./localhost.json');
let _id = data.map(function(e) {return e._id});
let scenario_id = data.map(function(e) {return e.scenario_id});
let pnode_name = data.map(function(e) {return e.pnode_name});
let period_id = data.map(function(e) {return e._period_id});
let lmp = data.map(function(e) {return e.lmp});

const state = {
  labels: pnode_name,
  datasets: [
    {
      label: 'Nodes',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: lmp
    }
  ]
}

export default class Graph extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'LMP Of Nodes',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}
//Graph.register(CategoryScale);