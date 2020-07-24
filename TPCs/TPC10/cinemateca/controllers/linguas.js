var Linguas = module.exports
const execQuery = require('../services/utils').execQuery


Linguas.getLista = async () => {
    var query = `select distinct ?l ?idLingua ?nome (COUNT(?filme) AS ?numFilmes) where {
        ?l a c:Língua .
        ?l c:nome ?nome .
        ?l c:éLínguaDe ?filme .
        bind(strafter(str(?l), 'cinema#') as ?idLingua) .
    }
    group by ?l ?nome ?idLingua
    order by desc(?numFilmes)`
    return execQuery(query)
}

Linguas.getLingua = async (idLingua) => {
    var query = `select ?nomeLingua ?filme ?idFilme ?filmeNome ?filmePopularidade ?filmeDataLancamento where {
        c:${idLingua} c:nome ?nomeLingua .
        c:${idLingua} c:éLínguaDe ?filme .
        ?filme c:título ?filmeNome .
        ?filme c:popularidade ?filmePopularidade .
        ?filme c:dataLançamento ?filmeDataLancamento .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    } order by desc(?filmePopularidade)`
    return execQuery(query)
}
