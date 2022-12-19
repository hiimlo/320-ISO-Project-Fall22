import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class ScatterChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: this.makeSeries(props)
        }
    }

    makeSeries(props) {
        return [
            {
                name: props.metric ?? 'LMP',
                data: props.data1.map(function (e, i) {
                    return [e, props.data2[i]]
                })
            }
        ]
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ series: this.makeSeries(nextProps) })
    }

    render() {
        return (
            <div className="scatter">
                <Chart
                    options={{
                        colors: ['#3B4252'],
                        chart: {
                            height: 350,
                            type: 'scatter',
                            zoom: {
                                enabled: true,
                                type: 'xy'
                            }
                        },
                        xaxis: { tickAmount: 10 },
                        yaxis: { tickAmount: 7 }
                    }}
                    series={this.state.series}
                    type="scatter"
                    width="500"
                />
            </div>
        )
    }
}
