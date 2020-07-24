<template>
  <v-card class="ma-2">
    <v-card-title>{{ filme.titulo }}</v-card-title>
    <v-card-text>
      <div id="info">
        <ul>
          <li>Data Lançamento: {{ filme.data }}</li>
          <li>Popularidade: {{ filme.pop }}</li>
          <li>Duração(min): {{ filme.duracao }}</li>
        </ul>
        <p>{{ filme.res }}</p>
      </div>
      <div id="generos">
        <h3>Géneros</h3>
        <v-data-table
          :headers="hgeneros"
          :items="filme.generos"
          class="elevation-1"
          :items-per-page="15"
          @click:row="clickGenero"
        >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possivel carregar os géneros do filme {{ filme.titulo }}...
            </v-alert>
          </template>
          <v-template v-slot:items="props">
            <tr>
              <td>{{ props.item.gnome }}</td>
            </tr>
          </v-template>
        </v-data-table>
      </div>
      <div id="atores">
        <h3>Atores</h3>
        <v-data-table
          :headers="hatores"
          :items="filme.atores"
          class="elevation-1"
          :items-per-page="15"
          @click:row="clickAtor"
        >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possivel carregar os atores do filme {{ filme.titulo }}...
            </v-alert>
          </template>
          <v-template v-slot:items="props">
            <tr>
              <td>{{ props.item.anome }}</td>
            </tr>
          </v-template>
        </v-data-table>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: 'FilmeIndividual',
  props: ['idFilme'],   
  data: () => ({
    filme: {},
    hgeneros: [
      { text: 'Género', sortable: true, value: 'gnome', class: 'subtitle-1' },
    ],
    hatores: [
      { text: 'Nome', sortable: true, value: 'anome', class: 'subtitle-1' },
    ],
  }),
  created: async function() {
    try {
      const response = await this.axios.get(`/filmes/${this.idFilme}`);
      this.filme = response.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    clickGenero(genero){
      alert(JSON.stringify(genero))
    },
    clickAtor(ator){
      alert(JSON.stringify(ator))
    }
  }
}
</script>

<style lang="scss">
#info {
  text-align: left;
  padding: 20px 30px;
}
ul li{
  font-size: 15px;
}
p{
  padding: 20px 0px;
  font-size: 15px;
}
#generos {
  padding: 10px;
  text-align: left;
}
#atores {
  padding: 10px;
  text-align: left;
}
</style>
