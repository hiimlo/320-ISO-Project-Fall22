import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class HeatMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }

    render() {
        return (
            <div id="heatmap">
                <Chart
                    options={{
                        chart: {
                            height: 350,
                            type: 'heatmap'
                        },
                        plotOptions: {
                            heatmap: {
                                shadeIntensity: 0.5,
                                radius: 0,
                                useFillColorAsStroke: true,
                                colorScale: {
                                    ranges: [
                                        {
                                            from: -30,
                                            to: 5,
                                            name: 'low',
                                            color: '#00A100'
                                        }
                                    ]
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: 1
                        },
                        title: {
                            text: 'HeatMap Chart with Color Range'
                        }
                    }}
                    series={this.state.data.map((row) => {
                        return {
                            name: 'NAME',
                            data: row
                        }
                    })}
                    type="heatmap"
                    height={400}
                />
            </div>
        )
    }
}
