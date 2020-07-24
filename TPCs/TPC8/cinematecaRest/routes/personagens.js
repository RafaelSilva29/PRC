let express = require('express');
let router = express.Router();
let Personagens = require('../controllers/personagens')

/* GET PERSONAGENS */
router.get('/', function(req, res, next) {
  Personagens.lista()
      .then(dados => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.jsonp(dados)
      })
      .catch(erro => res.status(500).send(`Erro na listagem de personagens: ${erro}`))
});

/* GET INDIVIDUAL PERSONAGEN */
router.get('/:id', async function(req, res, next) {
  try {
      let personagem = await Personagens.consultar(req.params.id)
      let filmes = await Personagens.getFilmes(req.params.id)
      personagem.push(filmes)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.jsonp(personagem)
  } catch(erro){
      res.status(500).send(`Erro na listagem do Personagem: ${erro}`)
  }
});

module.exports = router;