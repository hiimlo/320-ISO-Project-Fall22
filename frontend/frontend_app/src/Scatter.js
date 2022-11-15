import React from 'react';
import { useState } from 'react'
import './App.css';



import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";
//Chart.register(CategoryScale);


const data = require('./localhost.json');
const nodeList = data.map(x => x.pnode_name);

// Alex first push
export default class Graph2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { node: '.I.KENT    345 2' };
        this.changeNode = this.changeNode.bind(this);
    }

    changeNode(event, name) {
        this.setState({
            node: name
        })
    }

    createGraphState() {
        //const shuffledArray = array.sort((a, b) => 0.5 - Math.random());
        const ser = []
        for (let i = 0; i < 24; i++) {
            ser.push(
                {
                    name: i.toString(),
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }
            )
        }
        ser.map(function(x) {
            x.data = x.data.sort((a, b) => 0.5 - Math.random())
        })
        const graphState = {
            series: ser,
            options: {
                chart: {
                    height: 350,
                    type: 'heatmap',
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        radius: 0,
                        useFillColorAsStroke: true,
                        colorScale: {
                            ranges: [{
                                from: 0,
                                to: 3,
                                name: 'low',
                                color: '#00A100'
                            },
                            {
                                from: 4,
                                to: 6,
                                name: 'medium',
                                color: '#128FD9'
                            },
                            {
                                from: 7,
                                to: 9,
                                name: 'high',
                                color: '#FFB200'
                            },
                            {
                                from: 9,
                                to: 12,
                                name: 'extreme',
                                color: '#FF0000'
                            }
                            ]
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    type: 'MONTH',
                    categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
                },
                stroke: {
                    width: 1
                },
                title: {
                    text: 'HeatMap Chart with DUMMY DATA'
                },
            }
        }
        return graphState;
    }
    render() {
        return (
            <div>
                <div className="App-header">
                    {/* <Link className="App-link" to="/home">Go Home</Link> */}
                    <div className="Alert">NOTE: this is dummy for a proof of concept</div>
                    <div>{this.state.node}</div>
                </div>
                <DropdownButton className="DropdownButton" title="DROP" >
                    {nodeList.map(node =>
                        <Dropdown.Item className="DropdownItem" as="button" onClick={event => this.changeNode(event, node)}>
                            {node}
                        </Dropdown.Item>
                    )}
                </DropdownButton>
                <div>
                    {/* <Scatter className="Grapher"
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
            }} /> */}
                    <div id="chart">
                        <Chart
                            options={this.createGraphState().options}
                            series={this.createGraphState().series}
                            type="heatmap"
                            height={450}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
//Graph.register(CategoryScale);