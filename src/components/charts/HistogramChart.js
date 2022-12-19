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
                        colors: ['#5E81AC', '#D08770'],
                        chart: {
                            height: 350,
                            type: 'bar'
                        },
                        dataLabels: {
                            enabled: false
                        }
                    }}
                    series={this.state.series}
                    type="bar"
                    width="500"
                />
            </div>
        )
    }
}
