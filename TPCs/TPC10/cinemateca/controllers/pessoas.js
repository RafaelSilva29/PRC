var Pessoas = module.exports
const execQuery = require('../services/utils').execQuery


Pessoas.getLista = async () => {
    let resp = {}
    resp['atores'] = await Pessoas.getListaAux("Ator", "atuou")
    resp['realizadores'] = await Pessoas.getListaAux("Realizador", "realizou")
    resp['produtores'] = await Pessoas.getListaAux("Produtor", "produziu")
    resp['escritores'] = await Pessoas.getListaAux("Escritor", "escreveu")
    return resp
}

Pessoas.getListaAux = async (tipo, relacao) => {
    var query = `select distinct ?pessoa ?nome ?idPessoa ?sexo (COUNT(?filme) AS ?numFilmes) where {
        ?pessoa a c:${tipo} .
        ?pessoa c:nome ?nome .
        ?pessoa c:sexo ?sexo .
        ?pessoa c:${relacao} ?filme .
        bind(strafter(str(?pessoa), 'cinema#') as ?idPessoa) .
    }
    group by ?pessoa ?nome ?idPessoa ?sexo
    order by desc(?numFilmes)`;
    return execQuery(query)
}

Pessoas.getInfo = async (idPessoa) => {
    var query = `select ?nome ?sexo where {
        c:${idPessoa} c:nome ?nome .
        c:${idPessoa} c:sexo ?sexo .
    }`;
    return execQuery(query)
};

Pessoas.getFilmesAtuados = async (idPessoa) => {
    var query = `select ?filme ?filme_nome ?filme_popularidade ?idFilme ?idPersonagem ?filme_dataLancamento ?personagem_nome ?personagem where {
        c:${idPessoa} c:atuou ?filme .
        ?filme c:título ?filme_nome .
        ?filme c:popularidade ?filme_popularidade .
        ?filme c:dataLançamento ?filme_dataLancamento .
        c:${idPessoa} c:representa ?personagem .
        ?personagem c:nome ?personagem_nome .
        ?personagem c:éPersonagemDe ?filme .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
        bind(strafter(str(?personagem), 'cinema#') as ?idPersonagem) .
    }`;
    return execQuery(query)
};

Pessoas.getRealizados = async (idPessoa) => {
    var query = `select ?filme ?nome ?idFilme ?popularidade ?dataLancamento where {
        c:${idPessoa} c:realizou ?filme .
        ?filme c:título ?nome .
        ?filme c:popularidade ?popularidade .
        ?filme c:dataLançamento ?dataLancamento .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    }`;
    return execQuery(query)
};

Pessoas.getProduzidos = async (idPessoa) => {
    var query = `select ?filme ?idFilme ?nome ?popularidade ?dataLancamento where {
        c:${idPessoa} c:produziu ?filme .
        ?filme c:título ?nome .
        ?filme c:popularidade ?popularidade .
        ?filme c:dataLançamento ?dataLancamento .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    }`;
    return execQuery(query)
};

Pessoas.getEscritos = async (idPessoa) => {
    var query = `select ?filme ?idFilme ?nome ?popularidade ?dataLancamento where {
        c:${idPessoa} c:escreveu ?filme .
        ?filme c:título ?nome .
        ?filme c:popularidade ?popularidade .
        ?filme c:dataLançamento ?dataLancamento .
        bind(strafter(str(?filme), 'cinema#') as ?idFilme) .
    }`;
    return execQuery(query)
};

Pessoas.getPessoa = async (idPessoa) => {
    try {
        const info = await this.getInfo(idPessoa);
        var pessoa = info[0];
        pessoa['atuados'] = await this.getFilmesAtuados(idPessoa);
        pessoa['realizados'] = await this.getRealizados(idPessoa);
        pessoa['produzidos'] = await this.getProduzidos(idPessoa);
        pessoa['escritos'] = await this.getEscritos(idPessoa);
        return pessoa;
    } catch (e) {
        throw e;
    }
};
