var express = require('express');
var router = express.Router();
var Personagens = require('../controllers/personagens')

router.get('/', function(req, res) {
  Personagens.getLista()
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});

router.get('/:id', function(req, res) {
  Personagens.getPersonagem(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na personagem individual ${req.params.id}: ${e}`))
});

module.exports = router;
