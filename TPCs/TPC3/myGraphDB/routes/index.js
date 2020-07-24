var express = require('express');
var router = express.Router();
var axios = require('axios')

const prefixesConst =  `PREFIX noInferences: <http://www.ontotext.com/explicit>
                      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                      `

router.get('/', async function(req, res, next) {
  let repositories = []
  await axios.get("http://localhost:7200/repositories")
      .then(dados => {
        repositories = dados.data.results.bindings
      })
      .catch(erro => console.log(erro))
  res.render('index', { repositories: repositories, idRepository: req.query.idRepository });
});

router.post('/:idRepository', async function(req, res, next) {
  let repositories = []
  var data = []
  var prefixes = ""
  await axios.get("http://localhost:7200/repositories")
      .then(dados => {
        repositories = dados.data.results.bindings
      })
      .catch(erro => console.log(erro))

  let query = req.body.query
  let repositorio = req.params.idRepository
  let link = `http://localhost:7200/repositories/${repositorio}?query=`

  await axios.get(`http://localhost:7200/repositories/${repositorio}/namespaces`)
          .then(dados => {
              for(let i=0; i<dados.data.results.bindings.length; i++) {
                let tempNamespace = dados.data.results.bindings[i].namespace.value
                let tempPrefixvalue = dados.data.results.bindings[i].prefix.value
                let prefix = `PREFIX ${tempPrefixvalue}: <${tempNamespace}>\n`
                prefixes += prefix
              }
              prefixes = prefixes + prefixesConst
          })
          .catch(erro => console.log(erro))
  await axios.get(link + encodeURIComponent(prefixes + query))
        .then(dados => {
            for(let i = 0; i < dados.data.results.bindings.length; i++)
                data.push(dados.data.results.bindings[i])
        })
        .catch(erro => console.log(erro))
  
  res.render('index', { repositories: repositories, idRepository: req.params.idRepository, resultado: data });
});

module.exports = router;
