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
export default class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = { node: '.I.KENT    345 2' };
    }
    createGraphState() {
        var optionsArea = {
            options: {
                chart: {
                    height: 380,
                    type: 'area',
                    stacked: false,
                },
                stroke: {
                    curve: 'smooth'
                },

                xaxis: {
                    type: 'time',
                    categories: ['00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    
                },
                tooltip: {
                    followCursor: true
                },
                fill: {
                    opacity: 1,
                },
                dataLabels: {
                    enabled: false
                },
                yaxis: {
                    title: {
                        text: 'LMP'
                    }
                }
            },
            series: [{
                name: "LMP of Scenario",
                data: [11, 15, 26, 20, 33, 27, 24, 12, 34, 23, 10, 12, 23, 14, 22, 34, 45, 20, 18, 13, 12, 13, 15, 16]
            },
            {
                name: "LMP of Base Case",
                data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
            }
            ]

        };

        return optionsArea
    }
    render() {
        return (
            <div>
                <div className="sub-header">
                    {/* <Link className="App-link" to="/home">Go Home</Link> */}
                    <div className="Alert">NOTE: this is dummy for a proof of concept</div>
                </div>
                <div className="title" >{this.state.node}</div>
                <DropdownButton className="DropdownButton" title="DROP" >
                    {nodeList.map(node =>
                        <li key={node.toString()}>
                            <Dropdown.Item className="DropdownItem" as="button" onClick={event => this.changeNode(event, node)}>
                                {node}
                            </Dropdown.Item>
                        </li>
                    )}
                </DropdownButton>
                <div></div>
                <div id="chart">
                    <Chart
                        options={this.createGraphState().options}
                        series={this.createGraphState().series}
                        type="area"
                        height={400}
                    />
                </div>
            </div>

        );
    }
}
