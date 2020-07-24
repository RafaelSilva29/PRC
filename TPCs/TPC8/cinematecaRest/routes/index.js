let express = require('express');
let router = express.Router();
let Generos = require('../controllers/generos')
let Paises = require('../controllers/pais')
let Linguas = require('../controllers/linguas')


/* GET GENEROS */
router.get('/generos', function(req, res, next) {
  Generos.lista()
      .then(dados => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.jsonp(dados)
      })
      .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
});

/* GET PAIS */
router.get('/pais', function(req, res, next) {
  Paises.lista()
      .then(dados => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.jsonp(dados)
      })
      .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
});

/* GET LINGUAS */
router.get('/linguas', function(req, res, next) {
  Linguas.lista()
      .then(dados => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.jsonp(dados)
      })
      .catch(erro => res.status(500).send(`Erro na listagem de filmes: ${erro}`))
});

module.exports = router;