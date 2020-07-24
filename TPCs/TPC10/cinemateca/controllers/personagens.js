var Personagens = module.exports
const execQuery = require('../services/utils').execQuery


Personagens.getLista = async () => {
    var query = `select distinct ?personagem ?idPersonagem ?personagemNome ?ator ?idAtor ?atorNome ?filme ?idFilme ?filmeNome ?filmePopularidade ?filmeDataLancamento where {
        ?personagem a c:Personagem .
        ?personagem c:nome ?personagemNome .
        ?personagem c:éPersonagemDe ?filme .
        ?filme c:título ?filmeNome .
        ?filme c:popularidade ?filmePopularidade .
        ?filme c:dataLançamento ?filmeDataLancamento .
        ?personagem c:éRepresentadoPor ?ator.
        ?ator c:nome ?atorNome .
        filter(?filmeDataLancamento != '') .
        filter(?filmeDataLancamento < '2020-03-01') .
        bind(strafter(str(?personagem), 'cinema#') as ?idPersonagem) .
        bind(strafter(str(?ator), 'cinema#') as ?idAtor) .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    }
    order by desc(?filmePopularidade)
    limit 50000`
    return execQuery(query)
}

Personagens.getPersonagem = async (idPersonagem) => {
    var query = `select ?personagem_nome ?ator ?idAtor ?idFilme ?ator_nome ?filme ?filme_nome ?filme_popularidade ?filme_dataLancamento
    ?filme_duracao ?filme_resumo ?filme_genero ?filme_generoNome ?idGenero where {
        c:${idPersonagem} c:nome ?personagem_nome .
        c:${idPersonagem} c:éRepresentadoPor ?ator .
        ?ator c:nome ?ator_nome .
        c:${idPersonagem} c:éPersonagemDe ?filme .
        ?filme c:título ?filme_nome .
        ?filme c:popularidade ?filme_popularidade .
        ?filme c:dataLançamento ?filme_dataLancamento .
        ?filme c:duração ?filme_duracao .
        ?filme c:resumo ?filme_resumo .
        ?filme c:temGénero ?filme_genero .
        ?filme_genero c:nome ?filme_generoNome .
        bind(strafter(str(?filme_genero), 'cinema#') as ?idGenero) .
        bind(strafter(str(?ator), 'cinema#') as ?idAtor) .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    }`
    return execQuery(query)
}
