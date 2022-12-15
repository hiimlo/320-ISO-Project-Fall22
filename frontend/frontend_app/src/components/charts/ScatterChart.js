import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class ScatterChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: [
                {
                    name: props.metric ?? 'LMP',
                    data: props.data
                }
            ]
        }
    }

    render() {
        return (
            <div className="scatter">
                <Chart
                    options={{
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
