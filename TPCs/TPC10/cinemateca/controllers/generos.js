var Generos = module.exports
const execQuery = require('../services/utils').execQuery


Generos.getLista = async () => {
    var query = `SELECT distinct ?g ?idGenero ?nome (COUNT(?filme) AS ?numFilmes) WHERE {
        ?g a c:Género .
        ?g c:nome ?nome .
        bind(strafter(str(?g), 'cinema#') as ?idGenero) .
        ?g c:éGéneroDe ?filme .
    }
    GROUP BY ?g ?nome ?idGenero
    ORDER BY DESC(?numFilmes)`
    return execQuery(query)
}

Generos.getGenero = async (idGenero) => {
    var query = `select ?nomeGenero ?filme ?idFilme ?filmeNome ?filmePopularidade ?filmeDataLancamento where {
        c:${idGenero} c:nome ?nomeGenero .
        c:${idGenero} c:éGéneroDe ?filme .
        ?filme c:título ?filmeNome .
        ?filme c:popularidade ?filmePopularidade .
        ?filme c:dataLançamento ?filmeDataLancamento .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    } order by desc(?filmePopularidade)`
    return execQuery(query)
}
