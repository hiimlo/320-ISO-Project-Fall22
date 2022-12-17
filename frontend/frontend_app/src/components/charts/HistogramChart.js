import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class HistogramChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: this.makeSeries(props)
        }
    }

    makeSeries(props) {
        return [
            {
                name: props.metric ?? 'Scenario 1', //scenario 1 and 2
                data: props.data1
            },
            {
                name: props.metric ?? 'Scenario 2', //scenario 1 and 2
                data: props.data2
            }
        ]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ series: this.makeSeries(nextProps) })
    }

    render() {
        return (
            <div className="area">
                <Chart
                    options={{
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                        colors: ['#5E81AC', '#D08770'],
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
                        chart: {
                            height: 350,
                            type: 'bar'
                        },
                        dataLabels: {
                            enabled: false
                        }
                        // xaxis: {
                        //     type: 'datetime',
                        //     //categories should be defined based on the state. use helper
                        //     categories: [
                        //         '2018-09-19T00:00:00.000Z',
                        //         '2018-09-19T01:30:00.000Z',
                        //         '2018-09-19T02:30:00.000Z',
                        //         '2018-09-19T03:30:00.000Z',
                        //         '2018-09-19T04:30:00.000Z',
                        //         '2018-09-19T05:30:00.000Z',
                        //         '2018-09-19T06:30:00.000Z'
                        //     ]
                        // },
                    }}
                    series={this.state.series}
                    type="bar"
                    width="500"
                />
            </div>
        )
    }
}
