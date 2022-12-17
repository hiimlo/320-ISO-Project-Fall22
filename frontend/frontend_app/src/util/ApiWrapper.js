import axios from 'axios'

export class ApiWrapper {
    static apiUrl = 'http://localhost:3000'

    static async getDataRange(nname, scenario, start, end) {
        // console.log('getDatafromApiAsync')
        var queryString = '?'
        if (nname != null) {
            queryString += 'nname=' + encodeURIComponent(nname) + '&'
        }
        if (scenario != null) {
            queryString += 'scenario=' + scenario + '&'
        }
        if (start != null) {
            queryString += 'start=' + start + '&'
        }
        if (end != null) {
            queryString += 'end=' + end
        }
        if (queryString.charAt(queryString.length - 1) === '&') {
            queryString = queryString.slice(0, -1)
        }

        console.log('fetching ' + ApiWrapper.apiUrl + '/node' + queryString)
        try {
            const response = await axios.get(ApiWrapper.apiUrl + '/node' + queryString)
            //console.log('response  ', response)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getData(nname, scenario = 1, sort, metric) {
        var queryString = '?'
        if (nname != null) {
            queryString += 'id=' + encodeURIComponent(nname) + '&'
        }
        if (sort != null) {
            queryString += 'sort=' + sort + '&'
        }
        if (metric != null) {
            queryString += 'metric=' + metric
        }
        if (queryString.charAt(queryString.length - 1) === '&') {
            queryString = queryString.slice(0, -1)
        }
        console.log('fetching ' + ApiWrapper.apiUrl + '/scenarios/' + scenario + '/nodes/PNODE_NAME' + queryString)
        try {
            const response = await axios.get(ApiWrapper.apiUrl + '/scenarios/' + scenario + '/nodes/PNODE_NAME' + queryString)
            //console.log('response  ', response)
            return response.data
        } catch (error) {
            console.log(error)
        }
        // ApiWrapper.getData(
        //     //updates data1
        //     this.state.node,
        //     this.state.scenario1,
        //     this.state.startTime,
        //     this.state.endTime
        // ).then(
        //     (response) => {
        //         this.setState({
        //             isLoaded: true,
        //             data1: response.map((n) => n.LMP)
        //         })
        //     },
        //     (error) => {
        //         this.setState({
        //             isLoaded: true,
        //             error: true
        //         })
        //     }
        // )
    }

    static async getNodeList() {
        try {
            console.log('fetching ' + ApiWrapper.apiUrl + '/nodes')
            const response = await axios.get(ApiWrapper.apiUrl + '/nodes')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async getScenarios() {
        // console.log('getScenarios')
        try {
            console.log('fetching ' + ApiWrapper.apiUrl + '/scenarios')
            const response = await axios.get(ApiWrapper.apiUrl + '/scenarios')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
export default ApiWrapper
