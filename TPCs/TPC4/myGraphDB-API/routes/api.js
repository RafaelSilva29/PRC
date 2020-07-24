var express = require('express');
var router = express.Router();
var axios = require('axios')

const prefixesConst =  `PREFIX noInferences: <http://www.ontotext.com/explicit>
                      PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                      `

router.get('/repositories', async function(req, res, next) {
  await axios.get("http://localhost:7200/repositories")
      .then(dados => {
        let data = []
            for(let i = 0; i < dados.data.results.bindings.length; i++){
                data[i] = dados.data.results.bindings[i].id.value
            }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.jsonp(data)
      })
      .catch(erro => res.status(500).jsonp(erro))
});

router.get('/repositories/:idRepository', async function(req, res, next) {
  let prefixes = ""
  let flag = false
  let query = req.query.query
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
              flag = true
          })
          .catch(erro => {
            flag = false
            res.status(500).jsonp(erro)
          })
  
  if(flag) {
    let data = []
    await axios.get(link + encodeURIComponent(prefixes + query))
          .then(dados => {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.jsonp(dados.data)
          })
          .catch(erro => res.status(500).jsonp(erro))
  }
});

module.exports = router;
