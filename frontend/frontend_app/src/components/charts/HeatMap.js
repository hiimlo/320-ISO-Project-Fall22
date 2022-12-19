import React, { Component } from 'react'
import Chart from 'react-apexcharts'
const _ = require('lodash')

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
                            height: 'auto',
                            width: 'auto',
                            type: 'heatmap'
                        },
                        // plotOptions: {
                        //     heatmap: {
                        //         //reverseNegativeShade: true,
                        //         shadeIntensity: 0.5,
                        //         radius: 0,
                        //         useFillColorAsStroke: true,
                        //         colorScale: {
                        //             ranges: [
                        //                 {
                        //                     from: 0,
                        //                     to: 50,
                        //                     name: 'MAPE',
                        //                     color: '#4599D3'
                        //                 },
                        //                 {
                        //                     from: 50,
                        //                     to: 100,
                        //                     name: 'MAPE',
                        //                     color: '#eb3434'
                        //                 }
                        //                 // {
                        //                 //     from: 7.5,
                        //                 //     to: 15,
                        //                 //     name: 'MAPE',
                        //                 //     color: '#eb3434'
                        //                 // }
                        //             ]
                        //         }
                        //     }
                        // },
                        colors: ['#eb3434'],
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: 1
                        },
                        title: {
                            text: 'HeatMap Chart with Color Range'
                        },
                        xaxis: {
                            categories: _.range(1, 13)
                        }
                    }}
                    series={this.state.data.map((row, i) => {
                        return {
                            name: i,
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
