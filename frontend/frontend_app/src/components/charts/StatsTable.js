import React, { Component } from 'react'
import MaterialTable from 'material-table'
import tableIcons from './MaterialTableIcons'

export default class StatsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.makeData(props.data),
            rows: [
                { name: 'Mohammad', surname: 'Faisal', birthYear: 1995 },
                { name: 'Nayeem Raihan ', surname: 'Shuvo', birthYear: 1994 }
            ],
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Surname', field: 'surname' },
                { title: 'Birth Year', field: 'birthYear', type: 'numeric' }
            ]
        }
    }

    makeData(props) {
        return []
    }

    render() {
        return (
            <MaterialTable
                columns={this.state.columns}
                data={this.state.rows}
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
