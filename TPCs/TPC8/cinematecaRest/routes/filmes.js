let express = require('express');
let router = express.Router();
let Filmes = require('../controllers/filmes')


/* GET FILMES */
router.get('/', function(req, res, next) {
  Filmes.lista()
    .then(dados => {
        res.jsonp(dados)
        res.setHeader('Access-Control-Allow-Origin', '*')
    })
    .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
});

/* GET INDIVIDUAL FILME */
router.get('/:id', async function(req, res, next) {
    try {
        let filme = await Filmes.consultar(req.params.id)
        let produtores = await Filmes.getProducers(req.params.id)
        filme.push(produtores)
        let atores = await Filmes.getActors(req.params.id)
        filme.push(atores)
        let personagens = await Filmes.getPers(req.params.id)
        filme.push(personagens)
        let generos = await Filmes.getGenres(req.params.id)
        filme.push(generos)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.jsonp(filme)
    } catch(erro){ 
        res.status(500).send(`Erro na listagem do filme: ${erro}`)
    }
});

module.exports = router;