var express = require('express');
var router = express.Router();
var Linguas = require('../controllers/linguas')

router.get('/', function(req, res) {
  Linguas.getLista()
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem de linguas: ${e}`))
});

router.get('/:id', function(req, res) {
  Linguas.getLingua(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na lingua individual ${req.params.id}: ${e}`))
});

module.exports = router;
