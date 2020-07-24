var express = require('express');
var router = express.Router();
var Atores = require('../controllers/atores')


/* GET ATORES */
router.get('/', function(req, res, next) {
  Atores.lista()
      .then(dados => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.jsonp(dados)
      })
      .catch(erro => res.status(500).send(`Erro na listagem de atores: ${erro}`))
});

/* GET INDIVIDUAL ATOR */
router.get('/:id', async function(req, res, next) {
  try {
    let ator = await Atores.consultar(req.params.id)
    let filmes = await Atores.getFilmes(req.params.id)
    ator.push(filmes)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.jsonp(ator)
  } catch(erro){
    res.status(500).send(`Erro na listagem do ator: ${erro}`)
  }
});

module.exports = router;