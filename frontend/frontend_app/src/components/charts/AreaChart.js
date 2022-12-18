import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class AreaChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: this.makeSeries(props),
            timeSeries: props.timeSeries
        }
    }

    makeSeries(props) {
        let data_series = [
            {
                name: props.scenario1Name, 
                data: props.data1
            },
            {
                name: props.scenario2Name,
                data: props.data2
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
        this.setState({
            series: this.makeSeries(nextProps),
            timeSeries: nextProps.timeSeries
        })
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
                        xaxis: {
                            //categories should be defined based on the state. use helper
                            categories: this.state.timeSeries,
                            tickAmount: 10
                        },
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
