import React, { Component } from 'react'
import Chart from 'react-apexcharts'

export default class HeatMap extends Component {
    constructor(props) {
        super(props)
        this.state = {}
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
                                        },
                                        {
                                            from: 6,
                                            to: 20,
                                            name: 'medium',
                                            color: '#128FD9'
                                        },
                                        {
                                            from: 21,
                                            to: 45,
                                            name: 'high',
                                            color: '#FFB200'
                                        },
                                        {
                                            from: 46,
                                            to: 55,
                                            name: 'extreme',
                                            color: '#FF0000'
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
                    series={[
                        {
                            name: 'Jan',
                            data: [1, 2, 3]
                        },
                        {
                            name: 'Feb',
                            data: [1, 2, 3]
                        }
                    ]}
                    type="heatmap"
                    height={400}
                />
            </div>
        )
    }
}
//Graph.register(CategoryScale);
