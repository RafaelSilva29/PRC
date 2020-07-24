<template>
  <v-card class="ma-2">
    <v-card-title>Lista dos Filmes na BD</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hfilmes"
        :items="filmes"
        class="elevation-1"
        :items-per-page="15"
        @click:row="rowClicked"
      >
        <template v-slot:no-data>
          <v-alert :value="true" color="warning" icon="warning">
            Ainda não foi possivel carregar os dados...
          </v-alert>
        </template>
        <v-template v-slot:items="props">
          <tr>
            <td>{{ props.item.titulo }}</td>
            <td>{{ props.item.dataLancamento }}</td>
            <td>{{ props.item.linguaOriginal }}</td>
            <td>{{ props.item.duracao }}</td>
            <td>{{ props.item.popularidade }}</td>
          </tr>
        </v-template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: 'ListaFilmes',
  data: () => ({
    hfilmes: [
      { text: 'Título', sortable: true, value: 'titulo', class: 'subtitle-1' },
      { text: 'Data', sortable: true, value: 'data', class: 'subtitle-1' },
      { text: 'Língua', sortable: true, value: 'lingua', class: 'subtitle-1' },
      { text: 'Duração', sortable: true, value: 'duracao', class: 'subtitle-1' },
      { text: 'Popularidade', sortable: true, value: 'pop', class: 'subtitle-1' },
    ],
    filmes: [],
  }),
  created: async function() {
    try {
      const response = await this.axios.get('/filmes');
      this.filmes = response.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    rowClicked(filme){
      const idFilme = filme.f.split('#')[1];
      this.$router.push({ name: 'FilmeIndividual', params: { idFilme: idFilme }});
    },
  },
}
</script>
