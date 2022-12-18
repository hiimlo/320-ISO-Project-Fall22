import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class AreaChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: this.makeSeries(props)
        }
    }

    makeSeries(props) {
        let data_series = [
            {
                name: props.metric ?? 'Scenario 1', //scenario 1 and 2
                data: props.data1
            }
        ]
        if (props.data2 !== undefined) {
            data_series.push({
                name: props.metric ?? 'Scenario 2', //scenario 1 and 2
                data: props.data2
            })
        }
        return data_series
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ series: this.makeSeries(nextProps) })
    }

    render() {
        return (
            <div className="area">
                <Chart
                    options={{
                        colors: ['#5E81AC', '#D08770'],
                        chart: {
                            height: 350,
                            type: 'area'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth'
                        },
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
                        tooltip: {
                            x: {
                                format: 'dd/MM/yy HH:mm'
                            }
                        }
                    }}
                    series={this.state.series}
                    type="area"
                    width="500"
                />
            </div>
        )
    }
}
