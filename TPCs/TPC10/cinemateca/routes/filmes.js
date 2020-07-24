var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

router.get('/', function(req, res) {
  Filmes.getLista()
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/:id', function(req, res) {
  Filmes.getFilme(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro no filme individual ${req.params.id}: ${e}`))
});

module.exports = router;
