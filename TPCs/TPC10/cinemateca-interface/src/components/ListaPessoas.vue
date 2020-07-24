<template>
  <div>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col lg="2">
        <v-card
          class="mx-auto ma-2 ml-2"
          max-width="300"
          tile
        >
          <v-list shaped>
            <v-subheader>PESSOAS</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="show(item)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
         <v-card class="ma-2">
          <v-card-title class="indigo darken-4 white--text" dark>
            Cinemateca de PRC2020: Lista de {{ title }} na BD
            <v-spacer></v-spacer>
            <v-text-field
              v-model="filtrar"
              label="Filtrar"
              single-line
              hide-details
              dark
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="hpessoas"
              :items="pessoas"
              :footer-props="footer_props"
              :search="filtrar"
            >
              <template v-slot:no-data>
                <v-alert :value="true" color="#FFA500" icon="warning">
                  {{ alertTitle }}
                </v-alert>
              </template>
              <template v-slot:item.ops="{ item }">
                <v-icon
                    @click.prevent="clickPessoa(item)"
                  >mdi-account-search-outline</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="last"/>
  </div>
</template>


<script>
export default {
  name: 'ListaFilmes',
  data: () => ({
    item: 0,
    items: [
      { text: 'Atores', icon: 'mdi-account' },
      { text: 'Realizadores', icon: 'mdi-account' },
      { text: 'Produtores', icon: 'mdi-account' },
      { text: 'Escritores', icon: 'mdi-account' },
    ],
    hpessoas: [
      { text: 'Nome', sortable: true, value: 'nome', align: 'center', class: 'subtitle-1' },
      { text: 'Sexo', sortable: true, value: 'sexo', align: 'center', class: 'subtitle-1', filterable: false },
      { text: 'Número de Filmes', sortable: true, value: 'numFilmes', align: 'center', class: 'subtitle-1', filterable: false},
      { text: 'Operações', align: 'center', value: 'ops', filterable: false },
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    },
    filtrar: "",
    pessoas: [],
    title: 'Atores',
    alertTitle: 'Ainda não foi possivel carregar os dados...'
  }),
  created: async function() {
    try {
      const response = await this.axios.get('/pessoas/atores');
      this.pessoas = response.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    clickPessoa(pessoa){
      const idPessoa = pessoa.idPessoa;
      this.$router.push({ name: 'PessoaIndividual', params: { idPessoa: idPessoa }});
    },
    async show(item) {
      if(item.text === 'Atores') {
        this.pessoas = [];
        this.alertTitle = 'Ainda não foi possivel carregar os dados...'
        const response = await this.axios.get('/pessoas/atores');
        if(response.data.length === 1 && response.data[0].numFilmes === '0') {
          this.pessoas = [];
          this.alertTitle = 'Não existem atores para mostrar...'
        } else {
          this.pessoas = response.data
        }
      } else if(item.text === 'Realizadores') {
        this.pessoas = [];
        this.alertTitle = 'Ainda não foi possivel carregar os dados...'
        const response = await this.axios.get('/pessoas/realizadores');
        if(response.data.length === 1 && response.data[0].numFilmes === '0') {
          this.pessoas = [];
          this.alertTitle = 'Não existem realizadores para mostrar...'
        } else {
          this.pessoas = response.data
        }
      } else if(item.text === 'Produtores') {
        this.pessoas = [];
        this.alertTitle = 'Ainda não foi possivel carregar os dados...'
        const response = await this.axios.get('/pessoas/produtores');
        if(response.data.length === 1 && response.data[0].numFilmes === '0') {
          this.pessoas = [];
          this.alertTitle = 'Não existem produtores para mostrar...'
        } else {
          this.pessoas = response.data
        }
      } else if(item.text === 'Escritores') {
        this.pessoas = [];
        this.alertTitle = 'Ainda não foi possivel carregar os dados...'
        const response = await this.axios.get('/pessoas/escritores');
        if(response.data.length === 1 && response.data[0].numFilmes === '0') {
          this.pessoas = [];
          this.alertTitle = 'Não existem escritores para mostrar...'
        } else {
          this.pessoas = response.data
        }
      }
      this.title = item.text;
    }
  },
}
</script>

<style lang="scss">
.last{
  height: 80px;
}
</style>
