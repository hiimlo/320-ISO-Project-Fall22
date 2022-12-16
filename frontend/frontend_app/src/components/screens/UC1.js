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

//NEW
import AreaChart from '../charts/AreaChart'
import ApiWrapper from '../../util/ApiWrapper'
import ScatterChart from '../charts/ScatterChart'

export default class UC1 extends React.Component {
    constructor() {
        //super(props);
        super()
        this.state = {
            error: null,
            isLoaded: false,
            metric: '',
            node: 'UN.ALTA    345 UALT',
            nodeList: [],
            scenario1: 1,
            scenario2: 1,
            scenarioList: [],
            startTime: '2020-01-01',
            endTime: '2020-01-04',
            data1: [],
            data2: []
            // api response should be expected to be arr_series1, arr_series2, and time range or something like that
        }

        //bindings (so that state is not undefined in first render())
        this.changeBaseCase = this.changeBaseCase.bind(this)
        this.changeOtherScenario = this.changeOtherScenario.bind(this)
        //this.changeNode = this.changeNode.bind(this);
    }

    updateData1() {
        ApiWrapper.getData(
            //updates data1
            this.state.node,
            this.state.scenario1,
            this.state.startTime,
            this.state.endTime
        ).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    data1: response.map((n) => n.LMP)
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true
                })
            }
        )
    }
    updateData2() {
        ApiWrapper.getData(
            //updates data2
            this.state.node,
            this.state.scenario2,
            this.state.startTime,
            this.state.endTime
        ).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    data2: response.map((n) => n.LMP)
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: true
                })
            }
        )
    }

    componentDidMount() {
        console.log('UC1 post-mount...')
        //console.log(this.state.scenario1, this.state.scenario2)
        //get list of scenarios for drop down
        ApiWrapper.getScenarios().then((response) => {
            this.setState({
                scenarioList: response.SCENARIOS
            })
        })
        this.updateData1()
        this.setState({ data2: this.state.data1 })
        return
    }

    changeBaseCase(event) {
        this.setState({ scenario1: event.target.value }, function () {
            // callback
            this.updateData1()
        })
    }

    changeOtherScenario(event) {
        this.setState({ scenario2: event.target.value }, function () {
            // callback
            this.updateData2()
        })
    }

    // chart wise, we want scatter, histo, heatmap, and area
    render() {
        console.log('rendering UC1...')
        return (
            <div>
                <h1>hello world!</h1>
                <h3>Base Case:</h3>
                <select
                    value={this.state.scenario1}
                    onChange={this.changeBaseCase}
                >
                    {/* <option value={-1}>Please select scenario</option> */}
                    {this.state.scenarioList.map((s) => {
                        return (
                            <option key={s._id} value={s.SCENARIO_ID}>
                                {s.SCENARIO_NAME}
                            </option>
                        )
                    })}
                </select>
                <h3>Other Scenario:</h3>
                <select
                    value={this.state.scenario2}
                    onChange={this.changeOtherScenario}
                >
                    {this.state.scenarioList.map((s) => {
                        return (
                            <option key={s._id} value={s.SCENARIO_ID}>
                                {s.SCENARIO_NAME}
                            </option>
                        )
                    })}
                </select>

                <ScatterChart
                    data1={this.state.data1}
                    data2={this.state.data2}
                    metric={this.state.metric}
                />
                <AreaChart
                    data1={this.state.data1}
                    data2={this.state.data2}
                    metric={this.state.metric}
                />
            </div>
        )
    }
}
