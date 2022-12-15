import React from 'react'
import { useState } from 'react'
import '../../App.css'
// import { Scatter } from 'react-chartjs-2';

import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

import Heat from '../charts/HeatMap'
import Histo from '../charts/Histogram'
import Area from '../charts/AreaChart'
import ApiWrapper from '../../util/ApiWrapper'

//const data = require('./localhost.json');
//console.log(data);
//const nodeList = data.map(x => x.pnode_name);

let scenario = 2
let scenarioOther = 3

export default class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            chartData: [],
            otherChartData: [],
            node: 'UN.ALTA    345 UALT',
            nodeList: []
        }
        this.changeNode = this.changeNode.bind(this)
    }

    getChartData = () => {
        ApiWrapper.getDatafromApiAsync(
            this.state.node,
            scenario,
            '2020',
            '2021'
        ).then(
            (response) => {
                this.setState({
                    chartData: response.map((n) => n.LMP)
                    //nodeList: Object.keys(response)
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )

        ApiWrapper.getDatafromApiAsync(
            this.state.node,
            scenarioOther,
            '2020',
            '2021'
        ).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    otherChartData: response.map((n) => n.LMP)
                    //nodeList: Object.keys(response)
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    componentDidMount() {
        this.getChartData()
    }

    changeNode(event, name) {
        this.setState({
            node: name
        })
    }

    createGraphState() {
        const nodeName = this.state.node
        // let dataPoint = this.state.chartData.map((e, i) => {
        //   return {
        //     x: e,
        //     y: this.state.otherChartData[i]
        //   }
        // })
        let dataPoint = this.state.chartData.map((e, i) => {
            return [e, this.state.otherChartData[i]]
        })

        const graphState = {
            series: [
                {
                    name: nodeName,
                    data: dataPoint
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'scatter',
                    zoom: {
                        enabled: true,
                        type: 'xy'
                    }
                }
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    formatter: function (val) {
                        return parseFloat(val).toFixed(1)
                    }
                }
            },
            yaxis: {
                tickAmount: 7
            }
            //   labels: nodeName,
            //   datasets: [
            //     {
            //       label: 'LMP By Hour',
            //       backgroundColor: 'rgba(75,192,192,1)',
            //       borderColor: 'rgba(0,0,0,1)',
            //       borderWidth: 2,
            //       data: dataPoint,
            //     }
            //   ]
        }
        return graphState
    }
    render() {
        if (this.state.error) {
            return <div> ERRORRRRR </div>
        } else if (!this.state.isLoaded) {
            return (
                <div className="App-header">
                    <div className="Alert"> LOADING... </div>
                </div>
            )
        } else {
            return (
                <div className="contain">
                    <div className="sub-header">
                        <Link className="App-link" to="/home">
                            Go Home
                        </Link>
                    </div>

                    <div className="center">
                        <div className="title">
                            <div className="title">
                                <div>LMP of Nodes </div>
                                {/*<div>(x axis = LMP of Scenario {scenarioOther}, y axis = LMP of Scenario {scenario})</div>*/}
                            </div>
                            <div>{this.state.node}</div>
                        </div>
                        <DropdownButton className="DropdownButton" title="DROP">
                            {this.state.nodeList.map((node) => (
                                <li key={node.toString()}>
                                    <Dropdown.Item
                                        className="DropdownItem"
                                        as="button"
                                        onClick={(event) =>
                                            this.changeNode(event, node)
                                        }
                                    >
                                        {node}
                                    </Dropdown.Item>
                                </li>
                            ))}
                        </DropdownButton>
                        {/* <Scatter className="Grapher"
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
                    position: 'bottom',
                    title: {
                      display: true,
                      text: 'Scenario 2 LMP'
                    }
                  },
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: 'Scenario 3 LMP'
                    }
                  },
                }
              }} /> */}
                        <div id="chart">
                            <Chart
                                options={this.createGraphState().options}
                                series={this.createGraphState().series}
                                type="scatter"
                                height={400}
                            />
                        </div>
                    </div>
                    <div className="contain">
                        <div className="right">
                            <Heat />
                        </div>
                        <div className="left">
                            {' '}
                            <Histo />
                        </div>
                    </div>
                    <div>
                        <Area />
                    </div>
                </div>
            )
        }
    }
}
//Graph.register(CategoryScale);
