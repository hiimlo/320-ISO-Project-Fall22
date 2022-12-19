import React from 'react'
import '../../App.css'

import AreaChart from '../charts/AreaChart'
import ApiWrapper from '../../util/ApiWrapper'
import ScatterChart from '../charts/ScatterChart'
import HistogramChart from '../charts/HistogramChart'
import StatsTable from '../charts/StatsTable'

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
        this.changeScenario = this.changeScenario.bind(this)
        this.changeTimeGrouping = this.changeTimeGrouping.bind(this)
        this.changeNode = this.changeNode.bind(this)
    }

    updateData() {
        //updates state.data1
        ApiWrapper.getData(this.state.node, this.state.scenario, this.state.timeGrouping, this.state.metric).then(
            (response) => {
                this.setState({
                    isLoaded: true,
                    data: response[this.state.node]
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
        console.log('UC2 post-mount...')
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
        this.updateData()
        return
    }

    //EVENT HANDLERS
    changeScenario(event) {
        this.setState({ scenario: event.target.value }, () => this.updateData())
    }
    changeTimeGrouping(event) {
        this.setState({ timeGrouping: event.target.value }, () => this.updateData())
    }
    changeNode(event) {
        this.setState({ node: event.target.value }, () => this.updateData())
    }

    // chart wise, we want scatter, histo, heatmap, and area
    render() {
        console.log('rendering UC2...')
        return (
            <div>
                <h1>hello world!</h1>

                <h3>Pick Scenario:</h3>
                <select value={this.state.scenario} onChange={this.changeScenario}>
                    {this.state.scenarioList.map((s) => {
                        return (
                            <option key={s._id} value={s.SCENARIO_ID}>
                                {s.SCENARIO_NAME}
                            </option>
                        )
                    })}
                </select>
                <h3>Pick Node:</h3>
                <select value={this.state.node} onChange={this.changeNode}>
                    {this.state.nodeList.map((n) => {
                        return (
                            <option key={n} value={n}>
                                {n}
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

                <AreaChart data1={this.state.data.map((n) => n.MEAN)} metric={this.state.metric} />
                <StatsTable data={this.state.data} />
            </div>
        )
    }
}
