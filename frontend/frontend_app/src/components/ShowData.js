import React, { Component } from "react";
import ApiWrapper from "../util/ApiWrapper";

export default class ShowData extends React.Component {
    constructor() {
        super()

        this.state = {
            nname: 'UN.ALTA    345 UALT',
            scenario: 1,
            start: '2020',
            end: '2021',
            resultArr: []
        }

        this.callApi()
    }

    callApi() {
        ApiWrapper.getDatafromApiAsync(this.nname, this.scenario, this.start, this.end).then((response) => {
            console.log(response)
            this.setState({ resultArr: response});
        })
    }

    render() {
        return (
            <div>
                <h1>Node Name: {this.state.nname}</h1>
                <h1>Scenario: {this.state.scenario}</h1>
                <h1>Start Time: {this.state.start}</h1>
                <h1>End Time: {this.state.end}</h1>
                <ul>
                    {this.state.resultArr.map(item => {
                        return <li>{[item.SCENARIO_ID + ' ' + item.PNODE_NAME + ' ' + item.PERIOD_ID + ' ' + item.LMP]}</li>;
                    })}
                </ul>
                {/* <h1>{JSON.stringify(this.state.resultArr[0])}</h1> */}
            </div>
        );
    }
}