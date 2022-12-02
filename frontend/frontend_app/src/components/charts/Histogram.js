import React from 'react';
import { useState } from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts";

const data = require('../../localhost.json');
const nodeList = data.map(x => x.pnode_name);

export default class Histo extends React.Component {
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
        ser.map(function (x) {
            x.data = x.data.sort((a, b) => 0.5 - Math.random())
        })
        const graphState = {
            series: [{
                name: 'MAPE',
                data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                        columnWidth: '100%',
                    }
                },
                dataLabels: {
                    enabled: false,
                    // formatter: function (val) {
                    //     return val + "%";
                    // },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        show: true,
                        // formatter: function (val) {
                        //     return val + "%";
                        // }
                    }

                },
                title: {
                    text: 'Histogram of DUMMY DATA',
                    floating: true,
                    offsetY: -5,
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                }
            },
        }
        return graphState;
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
                        <li key = {node.toString()}>
                            <Dropdown.Item className="DropdownItem" as="button" onClick={event => this.changeNode(event, node)}>
                                {node}
                            </Dropdown.Item>
                         </li>
                    )}
                </DropdownButton>
                <div>
                    <div id="chart">
                        <Chart
                            options={this.createGraphState().options}
                            series={this.createGraphState().series}
                            type="bar"
                            height={400}
                        />
                    </div>
                </div>
            </div>
        );
    }
}