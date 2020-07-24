var express = require('express');
var router = express.Router();
var Paises = require('../controllers/paises')

router.get('/', function(req, res) {
  Paises.getLista()
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem de paises: ${e}`))
});

router.get('/:id', function(req, res) {
  Paises.getPais(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro no pais individual ${req.params.id}: ${e}`))
});

module.exports = router;
