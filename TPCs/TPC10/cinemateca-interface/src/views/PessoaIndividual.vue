<template>
  <div>
    <v-card class="ma-2" v-if="loading">   
      <v-alert :value="true" color="#FFA500" icon="warning">
        Ainda não foi possivel carregar a pessoa...
      </v-alert>
    </v-card>
    <v-card class="ma-2" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        {{ pessoa.nome }}
      </v-card-title>
      <v-card-text>
        <div id="info">
          <ul>
            <li v-if="pessoa.sexo === 'M'"><h4>Sexo:</h4>Masculino</li>
            <li v-else><h4>Sexo:</h4>Feminino</li>
          </ul>
        </div>
        <div id="atuados" v-if="pessoa.atuados && pessoa.atuados.length > 0">
          <h2>Filmes e Personagens</h2>
          <v-row
            class="mb-6"
            no-gutters
          >
            <v-col class="ma-2">
              <h2>Filmes</h2>
              <v-data-table
                :headers="hfilmes"
                :items="pessoa.atuados"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickFilme(item)"
                  >mdi-movie-open</v-icon>
                </template>
              </v-data-table>
            </v-col>
            <v-col class="ma-2" lg="4">
              <h2>Personagens</h2>
              <v-data-table
                :headers="hpersonagens"
                :items="pessoa.atuados"
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
        <div id="realizados-produzidos" v-if="(pessoa.realizados && pessoa.realizados.length > 0) || (pessoa.produzidos && pessoa.produzidos.length > 0)">
          <h2>Filmes Realizados e Produzidos</h2>
          <v-row
            class="mb-6"
            no-gutters
          >
            <v-col class="ma-2">
              <h2>Filmes Realizados</h2>
              <v-data-table
                :headers="hrealizados"
                :items="pessoa.realizados"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickFilme(item)"
                  >mdi-movie-open</v-icon>
                </template>
              </v-data-table>
            </v-col>
            <v-col class="ma-2">
              <h2>Filmes Produzidos</h2>
              <v-data-table
                :headers="hproduzidos"
                :items="pessoa.produzidos"
                class="elevation-1"
                :items-per-page="10"
              >
                <template v-slot:item.ops="{ item }">
                  <v-icon
                    @click.prevent="clickFilme(item)"
                  >mdi-movie-open</v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
        <div id="escritos" v-if="pessoa.escritos && pessoa.escritos.length > 0">
          <h2>Filmes Escritos</h2>
          <v-data-table
            :headers="hescritos"
            :items="pessoa.escritos"
            class="elevation-1"
            :items-per-page="10"
          >
            <template v-slot:item.ops="{ item }">
              <v-icon
                @click.prevent="clickFilme(item)"
              >mdi-movie-open</v-icon>
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
  name: 'PessoaIndividual',
  props: ['idPessoa'],   
  data: () => ({
    pessoa: {},
    loading: true,
    hfilmes: [
      { text: 'Nome Filme', sortable: true, align: 'center', value: 'filme_nome', class: 'subtitle-1' },
      { text: 'Popularidade', sortable: true, align: 'center', value: 'filme_popularidade', class: 'subtitle-1' },
      { text: 'Lançamento', sortable: true, align: 'center', value: 'filme_dataLancamento', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hpersonagens: [
      { text: 'Nome Personagem', sortable: true, align: 'center', value: 'personagem_nome', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hrealizados: [
      { text: 'Nome Filme', sortable: true, align: 'center', value: 'nome', class: 'subtitle-1' },
      { text: 'Popularidade', sortable: true, align: 'center', value: 'popularidade', class: 'subtitle-1' },
      { text: 'Lançamento', sortable: true, align: 'center', value: 'dataLancamento', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hproduzidos: [
      { text: 'Nome Filme', sortable: true, align: 'center', value: 'nome', class: 'subtitle-1' },
      { text: 'Popularidade', sortable: true, align: 'center', value: 'popularidade', class: 'subtitle-1' },
      { text: 'Lançamento', sortable: true, align: 'center', value: 'dataLancamento', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
    hescritos: [
      { text: 'Nome Filme', sortable: true, align: 'center', value: 'nome', class: 'subtitle-1' },
      { text: 'Popularidade', sortable: true, align: 'center', value: 'popularidade', class: 'subtitle-1' },
      { text: 'Lançamento', sortable: true, align: 'center', value: 'dataLancamento', class: 'subtitle-1' },
      { text: 'Operações', align: 'center', value: 'ops' },
    ],
  }),
  created: async function() {
    try {
      const response = await this.axios.get(`/pessoas/${this.idPessoa}`);
      this.pessoa = response.data
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    clickFilme(item){
      const idFilme = item.idFilme;
      this.$router.push({ name: 'FilmeIndividual', params: { idFilme: idFilme }});
    },
    clickPersonagem(item){
      alert(JSON.stringify(item.idPersonagem))
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
}
h2{
  text-align: center;
  padding: 10px;
}
h4{
  padding-right: 5px;
}
#atuados {
  padding: 20px;
  text-align: left;
}
#realizados-produzidos {
  padding: 20px;
  text-align: left;
}
#escritos {
  padding: 20px;
  text-align: left;
}
.last{
  height: 60px;
}
</style>
