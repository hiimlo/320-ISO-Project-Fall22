import React from 'react'
import '../../App.css'

import AreaChart from '../charts/AreaChart'
import ApiWrapper from '../../util/ApiWrapper'
import ScatterChart from '../charts/ScatterChart'
import HistogramChart from '../charts/HistogramChart'

export default class UC2 extends React.Component {
    constructor() {
        //super(props);
        super()
        this.state = {
            error: null,
            isLoaded: false,
            metric: 'LMP',
            node: '.Z.NORTH',
            nodeList: [],
            scenario: 1,
            scenarioList: [],
            // startTime: '2020-01-01',
            // endTime: '2020-01-04',
            timeGrouping: 'MONTH',
            data: []
        }

        //bindings (so that state is not undefined in first render())
    }

    // chart wise, we want scatter, histo, heatmap, and area
    render() {
        console.log('rendering UC2...')
        return (
            <div>
                <h1>hello world!</h1>
            </div>
        )
    }
}
