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
            scenario2: null,
            node: 'UN.ALTA    345 UALT',
            series_data: [
                [16.4, 5.4],
                [21.7, 2],
                [25.4, 3]
            ]
            // api response should be expected to be arr_series1, arr_series2, and time range or something like that
        }
        //this.changeNode = this.changeNode.bind(this);
    }

    transformData() {
        //transform for each kind of char
        return
    }

    getChartData = () => {
        return
    }

    // componentDidMount() {
    //     this.getChartData()
    //     return
    // }

    changeNode(event, name) {
        this.setState({
            node: name
        })
        return
    }

    createGraphState() {}

    // chart wise, we want scatter, histo, heatmap, and area chart
    render() {
        console.log('rendering UC1...')
        return (
            <div>
                <h1>hello world!</h1>
                <ScatterChart
                    series_data={this.state.series_data}
                    metric={this.state.metric}
                />
                <AreaChart
                    series_data={this.state.series_data}
                    metric={this.state.metric}
                />
            </div>
        )
    }
}
