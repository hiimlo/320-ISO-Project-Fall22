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

//const data = require('./localhost.json');
//console.log(data);
//const nodeList = data.map(x => x.pnode_name);

export default class UC1 extends React.Component {
    constructor() {
        //super(props);
        super()
        this.state = {
            error: null,
            isLoaded: false,
            metric: null,
            scenario1: 1,
            scenario2: -1,
            node: 'UN.ALTA    345 UALT',
            data: [
                [16.4, 5.4],
                [21.7, 2],
                [25.4, 3]
            ],
            scenarioList: []
            // api response should be expected to be arr_series1, arr_series2, and time range or something like that
        }
        //this.changeNode = this.changeNode.bind(this);
    }

    transformData() {
        //transform for each kind of chart
        return
    }

    getChartData = () => {
        return
    }

    componentDidMount() {
        console.log('UC1 post-mount...')

        //get list of scenarios for drop down
        ApiWrapper.getScenarios().then((response) => {
            this.setState({
                scenarioList: response.SCENARIOS.map((s) => s)
            })
        })

        //get node data
        // if (this.state.scenario2 !== -1) {
        //     ApiWrapper.getData(this.state.node, this.state.scenario2, '2020', '2021').then(
        //         (response) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 otherChartData: response.map((n) => n.LMP)
        //                 //nodeList: Object.keys(response)
        //             })
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             })
        //         }
        //     )
        // }
        return
    }

    changeNode(event, name) {
        this.setState({
            node: name
        })
        return
    }

    createGraphState() {}

    handleChange = (event) => {
        this.setState({
            scenario2: event.target.value
        })
    }

    // chart wise, we want scatter, histo, heatmap, and area
    render() {
        console.log('rendering UC1...')
        //console.log(this.state.scenario2)
        return (
            <div>
                <h1>hello world!</h1>
                <h3>Scenario:</h3>
                <select
                    value={this.state.scenario2}
                    onChange={this.handleChange}
                >
                    <option value={null}>Please select scenario</option>
                    {this.state.scenarioList.map((s) => {
                        return (
                            <option key={s.SCENARIO_ID} value={s.SCENARIO_ID}>
                                {s.SCENARIO_NAME}
                            </option>
                        )
                    })}
                </select>

                <ScatterChart
                    data={this.state.data}
                    metric={this.state.metric}
                />
                <AreaChart data={this.state.data} metric={this.state.metric} />
            </div>
        )
    }
}
