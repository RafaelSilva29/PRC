var express = require('express');
var router = express.Router();
var Generos = require('../controllers/generos')

router.get('/', function(req, res) {
  Generos.getLista()
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem de generos: ${e}`))
});

router.get('/:id', function(req, res) {
  Generos.getGenero(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro no genero individual ${req.params.id}: ${e}`))
});

module.exports = router;
