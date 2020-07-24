const axios = require('axios')
var Generos = module.exports
const execQuery = require('./utils').execQuery


Generos.lista = async function(req) {
    let query = `Select ?s ?genero where {
        ?s a :Género. 
        bind(strafter(str(?s),"cinema#") AS ?genero).
    }
    `
    return execQuery(query)
}