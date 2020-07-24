var axios = require('axios')
const endpoit = "http://localhost:7200/repositories/cinema2020"

const prefixes = `
    PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
`

exports.execQuery = async function (query) {
    let encoded = encodeURIComponent(prefixes + query)
    try {
        let response = await axios.get(endpoit + "?query=" + encoded)
        return myNormalize(response.data)        
    }
    catch(error) {
        return("ERRO: " + error)
    }
}

function myNormalize(response) {
    return response.results.bindings.map(obj => {
        var new_obj = {};
        for (let [k,v] of Object.entries(obj)) {
            new_obj[k] = v.value;
        }
        return new_obj
    });
};
