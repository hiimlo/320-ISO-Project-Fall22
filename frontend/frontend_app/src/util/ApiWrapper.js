import axios from 'axios';

export class ApiWrapper {
    static apiUrl = 'http://localhost:3000'

    static async getDatafromApiAsync(nname, scenario, start, end) {
        console.log('getDatafromApiAsync')
        var queryString = '?'
        if (nname != null) { queryString += 'nname='+encodeURIComponent(nname)+'&' }
        if (scenario != null) { queryString += 'scenario='+scenario+'&' }
        if (start != null) { queryString += 'start='+start+'&' }
        if (end != null) { queryString += 'end='+end }
        if(queryString.charAt(queryString.length-1) == "&") {
            queryString = queryString.slice(0, -1)
        }

        console.log('fetching')
        console.log(ApiWrapper.apiUrl+'/node'+queryString)
        try {
            const response = await axios.get(ApiWrapper.apiUrl+'/node'+queryString);
            console.log('response  ', response)
            return response.data;
        } catch(error) {
            console.log(error);
        }
    }
}
export default ApiWrapper