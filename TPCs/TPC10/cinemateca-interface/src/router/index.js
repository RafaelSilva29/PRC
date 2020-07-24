import Vue from 'vue'
import VueRouter from 'vue-router'
import Filmes from '../views/Filmes.vue'
import FilmeIndividual from '../views/FilmeIndividual.vue'
import Pessoas from '../views/Pessoas.vue'
import PessoaIndividual from '../views/PessoaIndividual.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Filmes',
    component: Filmes
  },
  {
    path: '/filmes',
    name: 'Filmes',
    component: Filmes
  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: Pessoas
  },
  { 
    path: '/filmes/:idFilme',
    name: 'FilmeIndividual',
    component: FilmeIndividual, 
    props: true 
  },
  { 
    path: '/pessoas/:idPessoa',
    name: 'PessoaIndividual',
    component: PessoaIndividual, 
    props: true 
  },
  { 
    path: '*',
    redirect: '/', 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
