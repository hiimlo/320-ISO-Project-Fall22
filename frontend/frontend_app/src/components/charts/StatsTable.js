import React, { Component } from 'react'
import MaterialTable from 'material-table'
import tableIcons from './MaterialTableIcons'

export default class StatsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.tabularizeData(props.data)
        }
    }

    //LIFECYCLE HOOKS
    componentWillReceiveProps(nextProps) {
        this.setState({ data: this.tabularizeData(nextProps.data) })
    }

    //DATA TRANSFORMATION
    tabularizeData(props) {
        console.log(props)
        return {
            rows: [{ PERIOD_ID: '2020-01-01', MEAN: 1.0, MEDIAN: 2.0, STD: 3.0 }],
            columns: [
                { title: 'PERIOD_ID', field: 'PERIOD_ID' },
                { title: 'MEAN', field: 'MEAN', type: 'numeric' },
                { title: 'MEDIAN', field: 'MEDIAN', type: 'numeric' },
                { title: 'STD', field: 'STD', type: 'numeric' }
            ]
        }
    }

    render() {
        return (
            <MaterialTable
                columns={this.state.data.columns}
                data={this.state.data.rows}
                title="Stats Table"
                icons={tableIcons}
                options={{
                    exportButton: {
                        csv: true,
                        pdf: true
                    }
                }}
            />
        )
    }
}
