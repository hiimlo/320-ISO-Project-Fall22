import React, { Component } from 'react'
import MaterialTable from 'material-table'
import tableIcons from './MaterialTableIcons'
import { CsvBuilder } from 'filefy'

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
        return {
            rows: props.map((e) => {
                return {
                    PERIOD_ID: e.TIME,
                    MEAN: e.MEAN,
                    MEDIAN: e.MEDIAN,
                    STD: e.STD
                }
            }),
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
                        pdf: false
                    },
                    exportCsv: (columns, rows) => {
                        const columnTitles = columns.map((c) => c.title)
                        const csvData = rows.map((r) =>
                            columnTitles.map((title) => {
                                return r[title]
                            })
                        )
                        const builder = new CsvBuilder(`stats.csv`).setColumns(columnTitles).addRows(csvData).exportFile()
                        return builder
                    }
                }}
            />
        )
    }
}
