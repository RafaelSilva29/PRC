var Filmes = module.exports
const execQuery = require('../services/utils').execQuery


Filmes.getLista = async function(){
    var query = `select ?f ?idFilme ?titulo ?duracao ?data ?pop ?res where {
        ?f a c:Filme .
        ?f c:título ?titulo .
        ?f c:duração ?duracao .
        ?f c:dataLançamento ?data .
        ?f c:línguaOriginal ?lingua .
        ?f c:popularidade ?pop .
        ?f c:resumo ?res .
        bind(strafter(str(?f), 'cinema#') as ?idFilme) .
    } order by desc(?pop)` 
    return execQuery(query)
}

async function getFilmeAtomica(idFilme){
    var query = `select ?f ?titulo ?duracao ?data ?pop ?res where {
        c:${idFilme} a c:Filme .
        c:${idFilme} c:título ?titulo .
        c:${idFilme} c:duração ?duracao .
        c:${idFilme} c:dataLançamento ?data .
        c:${idFilme} c:línguaOriginal ?lingua .
        c:${idFilme} c:popularidade ?pop .
        c:${idFilme} c:resumo ?res .
    } ` 
    return execQuery(query)
}

Filmes.getAtores = async (idFilme) => {
    var query = `select ?ator ?idAtor ?ator_nome ?personagem ?idPersonagem ?personagem_nome where {
        c:${idFilme} c:temPersonagem ?personagem .
        ?personagem c:nome ?personagem_nome .
        ?personagem c:éRepresentadoPor ?ator .
        ?ator c:nome ?ator_nome .
        bind(strafter(str(?ator), 'cinema#') as ?idAtor) .
        bind(strafter(str(?personagem), 'cinema#') as ?idPersonagem) .
    }`;
    return execQuery(query)
};

Filmes.getRealizadores = async (idFilme) => {
    var query = `SELECT ?realizador ?idRealizador ?nome WHERE {
        c:${idFilme} c:temRealizador ?realizador .
        ?realizador c:nome ?nome .
        bind(strafter(str(?realizador), 'cinema#') as ?idRealizador) .
    }`;
    return execQuery(query)
};

Filmes.getProdutores = async (idFilme) => {
    var query = `select ?produtor ?idProdutor ?nome where {
        c:${idFilme} c:temProdutor ?produtor .
        ?produtor c:nome ?nome .
        bind(strafter(str(?produtor), 'cinema#') as ?idProdutor) .
    }`;
    return execQuery(query)
};

Filmes.getEscritores = async (idFilme) => {
    var query = `select ?escritor ?idEscritor ?nome where {
        c:${idFilme} c:foiEscrito ?escritor .
        ?escritor c:nome ?nome .
        bind(strafter(str(?escritor), 'cinema#') as ?idEscritor) .
    }`;
    return execQuery(query)
};

Filmes.getLinguas =  async function(idFilme) {
    var query = `select distinct ?lingua ?idLingua ?l where {
        c:${idFilme} c:temLíngua ?lingua .
        ?lingua c:nome ?l .
        bind(strafter(str(?lingua), 'cinema#') as ?idLingua) .
    } ` 
    return execQuery(query)
}

Filmes.getPaises = async (idFilme) => {
    var query = `select ?pais ?idPais ?nome where {
        c:${idFilme} c:temPaísOrigem ?pais .
        ?pais c:nome ?nome .
        bind(strafter(str(?pais), 'cinema#') as ?idPais) .
    }`;
    return execQuery(query)
};

Filmes.getGeneros =  async function(idFilme) {
    var query = `select ?g ?idGenero ?gnome where {
        c:${idFilme} c:temGénero ?g .
        ?g c:nome ?gnome .
        bind(strafter(str(?g), 'cinema#') as ?idGenero) .
    } ` 
    return execQuery(query)
}

Filmes.getPersonagens =  async function(idFilme) {
    var query = `select ?p ?idPersonagem ?pnome where {
        c:${idFilme} c:temPersonagem ?p .
        ?p c:nome ?pnome .
        bind(strafter(str(?p), 'cinema#') as ?idPersonagem) .
    } ` 
    return execQuery(query)
}

Filmes.getFilme =  async function(idFilme) {
    try {
        const atomica = await getFilmeAtomica(idFilme)
        const generos = await Filmes.getGeneros(idFilme)
        const atores = await Filmes.getAtores(idFilme)
        const realizadores = await Filmes.getRealizadores(idFilme)
        const produtores = await Filmes.getProdutores(idFilme)
        const escritores = await Filmes.getEscritores(idFilme)
        const linguas = await Filmes.getLinguas(idFilme)
        const paises = await Filmes.getPaises(idFilme)
        let filme = atomica[0]
        filme['generos'] = generos
        filme['atores'] = atores
        filme['realizadores'] = realizadores
        filme['produtores'] = produtores
        filme['escritores'] = escritores
        filme['linguas'] = linguas
        filme['paises'] = paises
        return filme
    } catch (error) {
        throw(error)
    }
}
