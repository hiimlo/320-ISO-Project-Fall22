import React from 'react'
import { useState } from 'react'
import '../../App.css'
// import { Scatter } from 'react-chartjs-2';

import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css'

//NEW
import AreaChart from '../charts/AreaChart'
import ApiWrapper from '../../util/ApiWrapper'
import ScatterChart from '../charts/ScatterChart'
import HistogramChart from '../charts/HistogramChart'
import HeatMap from '../charts/HeatMap'

export default class UC1 extends React.Component {
    constructor() {
        //super(props);
        super()
        this.state = {
            error: null,
            isLoaded: false,
            metric: 'LMP',
            node: '.Z.NORTH',
            nodeList: [],
            scenario1: 1,
            scenario2: 1,
            scenarioList: [],
            // startTime: '2020-01-01',
            // endTime: '2020-01-04',
            timeGrouping: 'MONTH',
            data1: [],
            data2: [],
            timeSeries: [],
            scenario1Name: 'Base Case',
            scenario2Name: 'Base Case'
        }

        //bindings (so that state is not undefined in first render())
        this.changeBaseCase = this.changeBaseCase.bind(this)
        this.changeOtherScenario = this.changeOtherScenario.bind(this)
        this.changeTimeGrouping = this.changeTimeGrouping.bind(this)
        //this.changeNode = this.changeNode.bind(this);
    }

    componentDidMount() {
        console.log('UC1 post-mount...')
        //console.log(this.state.scenario1, this.state.scenario2)
        ApiWrapper.getScenarios().then((response) => {
            // getting scenario list...
            this.setState({
                scenarioList: response.SCENARIOS
            })
        })
        ApiWrapper.getNodeList().then((response) => {
            //getting node list...
            this.setState({
                nodeList: response
            })
        })
        this.updateData1()
        this.setState({ data2: this.state.data1 })
        return
    }

    updateData1() {
        //updates state.data1
        ApiWrapper.getData(this.state.node, this.state.scenario1, this.state.timeGrouping, this.state.metric).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    data1: response[this.state.node].map((n) => n.MEAN),
                    timeSeries: response[this.state.node].map((n) => n.TIME)
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
        //updates state.data2
        ApiWrapper.getData(this.state.node, this.state.scenario2, this.state.timeGrouping, this.state.metric).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    data2: response[this.state.node].map((n) => n.MEAN),
                    timeSeries: response[this.state.node].map((n) => n.TIME)
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.scenario1 !== this.state.scenario1) {
            const self = this
            var id = Number(this.state.scenario1)
            var list = self.state.scenarioList.filter((s) => s.SCENARIO_ID === id)
            var name = ''
            if (list.length > 0) {
                name = list[0].SCENARIO_NAME
            }
            this.setState({ scenario1Name: name })
            console.log('Base Case Has Changed')
        }
        if (prevState.scenario2 !== this.state.scenario2) {
            const self = this
            var id = Number(this.state.scenario2)
            var list = self.state.scenarioList.filter((s) => s.SCENARIO_ID === id)
            var name = ''
            if (list.length > 0) {
                name = list[0].SCENARIO_NAME
            }
            this.setState({ scenario2Name: name })
            console.log('Other Scenario Has Changed')
        }
    }

    //EVENT HANDLERS
    changeBaseCase(event) {
        console.log(event.target.value)
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
    changeTimeGrouping(event) {
        this.setState({ timeGrouping: event.target.value }, function () {
            // callback
            this.updateData1()
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
                <select value={this.state.scenario1} onChange={this.changeBaseCase}>
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
                <select value={this.state.scenario2} onChange={this.changeOtherScenario}>
                    {this.state.scenarioList.map((s) => {
                        return (
                            <option key={s._id} value={s.SCENARIO_ID}>
                                {s.SCENARIO_NAME}
                            </option>
                        )
                    })}
                </select>

                <label>
                    Pick your time grouping:
                    <select value={this.state.timeGrouping} onChange={this.changeTimeGrouping}>
                        <option value="DAY">Day</option>
                        <option value="MONTH">Month</option>
                        <option value="QUARTER">Quarter</option>
                        <option value="YEAR">Year</option>
                        <option value="ALL">All</option>
                    </select>
                </label>

                <ScatterChart data1={this.state.data1} data2={this.state.data2} metric={this.state.metric} />
                <AreaChart
                    data1={this.state.data1}
                    data2={this.state.data2}
                    metric={this.state.metric}
                    timeSeries={this.state.timeSeries}
                    scenario1Name={this.state.scenario1Name}
                    scenario2Name={this.state.scenario2Name}
                />
                <HistogramChart data1={this.state.data1} data2={this.state.data2} metric={this.state.metric} />
                <HeatMap></HeatMap>
            </div>
        )
    }
}
