var Paises = module.exports
const execQuery = require('../services/utils').execQuery


Paises.getLista = async () => {
    var query = `select distinct ?pais ?nome ?idPais (COUNT(?filme) AS ?numFilmes) where {
        ?pais a c:País .
        ?pais c:nome ?nome .
        ?pais c:éPaísOrigemDe ?filme .
        bind(strafter(str(?pais), 'cinema#') as ?idPais) .
    }
    group by ?pais ?nome ?idPais
    order by desc(?numFilmes)`
    return execQuery(query)
}

Paises.getPais = async (idPais) => {
    var query = `select ?nomePais ?filme ?filmeNome ?idFilme ?filmePopularidade ?filmeDataLancamento where {
        c:${idPais} c:nome ?nomePais .
        c:${idPais} c:éPaísOrigemDe ?filme .
        ?filme c:título ?filmeNome .
        ?filme c:popularidade ?filmePopularidade .
        ?filme c:dataLançamento ?filmeDataLancamento .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    } order by desc(?filmePopularidade)`
    return execQuery(query)
}
