<template>
  <div>
    <v-card class="ma-2" v-if="loading">   
      <v-alert :value="true" color="#FFA500" icon="warning">
        Ainda não foi possivel carregar o filme...
      </v-alert>
    </v-card>
    <v-card class="ma-2" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        {{ filme.titulo }}
      </v-card-title>
      <v-card-text>
        <div id="info">
          <ul>
            <li><h4>Lançamento:</h4> {{ filme.data }}</li>
            <li><h4>Popularidade:</h4> {{ filme.pop }}</li>
            <li><h4>Duração(minutos):</h4> {{ filme.duracao }}</li>
          </ul>
          <p>{{ filme.res }}</p>
        </div>
        <div id="generos" v-if="filme.generos && filme.generos.length > 0">
          <h2>Géneros</h2>
          <v-data-table
            :headers="hgeneros"
            :items="filme.generos"
            class="elevation-1"
            :items-per-page="10"
          >
            <template v-slot:item.ops="{ item }">
              <v-icon
                @click.prevent="clickGenero(item)"
              >mdi-movie-roll </v-icon>
            </template>
          </v-data-table>
        </div>
        <div id="atores-personagens" v-if="filme.atores && filme.atores.length > 0">
          <v-row
            class="mb-6"
            no-gutters
          >
            <v-col class="ma-2">
              <h2>Atores</h2>
              <v-data-table
                :headers="hatores"
                :items="filme.atores"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickAtor(item)"
                  >mdi-account-search-outline</v-icon>
                </template>
              </v-data-table>
            </v-col>
            <v-col class="ma-2">
              <h2>Personagens</h2>
              <v-data-table
                :headers="hpersonagens"
                :items="filme.atores"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickPersonagem(item)"
                  >mdi-account-search-outline</v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
        <div id="realizadores-produtores">
          <v-row
            class="mb-6"
            no-gutters
          >
            <v-col class="ma-2" v-if="filme.realizadores && filme.realizadores.length > 0">
              <h2>Realizadores</h2>
              <v-data-table
                :headers="hrealizadores"
                :items="filme.realizadores"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickRealizador(item)"
                  >mdi-movie-open-outline</v-icon>
                </template>
              </v-data-table>
            </v-col>
            <v-col  class="ma-2" v-if="filme.produtores && filme.produtores.length > 0">
              <h2>Produtores</h2>
              <v-data-table
                :headers="hprodutores"
                :items="filme.produtores"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickProdutor(item)"
                  >mdi-movie-open-outline</v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
         <div id="linguas-paises">
          <v-row
            class="mb-6"
            no-gutters
          >
            <v-col class="ma-2" v-if="filme.linguas && filme.linguas.length > 0">
              <h2>Línguas</h2>
                <v-data-table
                    :headers="hlinguas"
                    :items="filme.linguas"
                    class="elevation-1"
                    :items-per-page="15"
                  >
                  <template v-slot:item.ops="{ item }">
                    <v-icon
                      @click.prevent="clickLingua(item)"
                    >mdi-translate</v-icon>
                  </template>
              </v-data-table>
            </v-col>
            <v-col class="ma-2" v-if="filme.paises && filme.paises.length > 0">
              <h2>Países</h2>
              <v-data-table
                :headers="hpaises"
                :items="filme.paises"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickPais(item)"
                  >mdi-flag-variant-outline</v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
        <div id="escritores" v-if="filme.escritores && filme.escritores.length > 0">
          <h2>Escritores</h2>
          <v-data-table
            :headers="hescritores"
            :items="filme.escritores"
            class="elevation-1"
            :items-per-page="10"
          >
            <template v-slot:item.ops="{ item }">
              <v-icon
                @click.prevent="clickEscritor(item)"
              >mdi-typewriter</v-icon>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
      <div id=button>
        <v-btn
          @click.native="$router.go(-1)"
          text
        >
          <v-icon class="transparant">mdi-arrow-left</v-icon>
          <span class="mr-2 grey--text">Voltar atrâs</span>
        </v-btn>
      </div>
      <div class="last"/>
    </v-card>
  </div>
</template>


<script>
export default {
  name: 'FilmeIndividual',
  props: ['idFilme'],   
  data: () => ({
    filme: {},
    loading: true,
    hgeneros: [
      { text: 'Género', align: 'center', sortable: true, value: 'gnome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hatores: [
      { text: 'Nome Ator', sortable: true, align: 'center', value: 'ator_nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hpersonagens: [
      { text: 'Nome Personagem', sortable: true, align: 'center', value: 'personagem_nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hrealizadores: [
      { text: 'Nome Realizador', sortable: true, align: 'center', value: 'nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hprodutores: [
      { text: 'Nome Produtor', sortable: true, align: 'center', value: 'nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hlinguas: [
      { text: 'Língua', sortable: true, align: 'center', value: 'l', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hpaises: [
      { text: 'Pais', sortable: true, align: 'center', value: 'nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
     hescritores: [
      { text: 'Nome', align: 'center', sortable: true, value: 'nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
  }),
  created: async function() {
    try {
      const response = await this.axios.get(`/filmes/${this.idFilme}`);
      this.filme = response.data
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    clickGenero(genero){
      alert(JSON.stringify(genero.idGenero))
    },
    clickAtor(item){
      const idPessoa = item.idAtor;
      this.$router.push({ name: 'PessoaIndividual', params: { idPessoa: idPessoa }});
    },
    clickPersonagem(item){
      alert(JSON.stringify(item.idPersonagem))
    },
    clickRealizador(item){
      const idPessoa = item.idRealizador;
      this.$router.push({ name: 'PessoaIndividual', params: { idPessoa: idPessoa }});
    },
    clickProdutor(item){
      const idPessoa = item.idProdutor;
      this.$router.push({ name: 'PessoaIndividual', params: { idPessoa: idPessoa }});
    },
    clickLingua(item){
      alert(JSON.stringify(item.idLingua))
    },
    clickPais(item){
      alert(JSON.stringify(item.idPais))
    },
    clickEscritor(item){
      const idPessoa = item.idEscritor;
      this.$router.push({ name: 'PessoaIndividual', params: { idPessoa: idPessoa }});
    },
  }
}
</script>

<style lang="scss">
#info {
  padding-top: 20px;
  text-align: left;
}
ul li{
  font-size: 15px;
  display: flex;
  padding: 0px 0px;
}
p{
  padding: 20px;
  font-size: 15px;
  text-align: justify;
  text-justify: inter-word;
}
h2{
  text-align: center;
  padding: 10px;
}
h4{
  padding-right: 5px;
}
#linguas-paises {
  padding: 20px;
  text-align: left;
}
#generos {
  padding: 20px;
  text-align: left;
}
#atores-personagens {
  padding: 20px;
  text-align: left;
}
#realizadores-produtores {
  padding: 20px;
  text-align: left;
}
.last{
  height: 60px;
}
</style>
