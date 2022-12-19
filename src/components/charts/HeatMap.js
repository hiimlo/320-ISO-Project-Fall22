import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { CsvBuilder } from 'filefy'
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
                        toolbar: {
                            export: {
                                csv: {
                                    headerCategory: 'Date;Time',
                                    columnDelimiter: ';',
                                    dateFormatter: function (timestamp) {
                                        // var date = dayjs(new Date(timestamp));
                                        // var format = 'ddd D. MMM;HH:mm'  // sic: Delimiter in here on purpose
                                        // var nextHour = Number(date.hour()) + 1;
                                        // var text = date.format(format) + ' - ' + nextHour + ':00';
                                        return 'text'
                                    }
                                }
                            }
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
                            text: 'Max Absolute Percent Error per Month, Hour'
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
