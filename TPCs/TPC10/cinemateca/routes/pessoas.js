var express = require('express');
var router = express.Router();
var Pessoas = require('../controllers/pessoas')

router.get('/', function(req, res) {
  Pessoas.getLista()
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem de pessoas: ${e}`))
});

router.get("/atores", function (req, res) {
  Pessoas.getListaAux("Ator", "atuou")
      .then((dados) => res.jsonp(dados))
      .catch((erro) => res.status(500).send(`Erro na listagem de atores: ${erro}`));
});

router.get("/realizadores", function (req, res) {
  Pessoas.getListaAux("Realizador", "realizou")
      .then((dados) => res.jsonp(dados))
      .catch((erro) => res.status(500).send(`Erro na listagem de realizadores: ${erro}`));
});

router.get("/produtores", function (req, res) {
  Pessoas.getListaAux("Produtor", "produziu")
      .then((dados) => res.jsonp(dados))
      .catch((erro) => res.status(500).send(`Erro na listagem de produtores: ${erro}`));
});

router.get("/escritores", function (req, res) {
  Pessoas.getListaAux("Escritor", "escreveu")
      .then((dados) => res.jsonp(dados))
      .catch((erro) => res.status(500).send(`Erro na listagem de escritores: ${erro}`));
});

router.get('/:id', function(req, res) {
  Pessoas.getPessoa(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na pessoa individual ${req.params.id}: ${e}`))
});

module.exports = router;
