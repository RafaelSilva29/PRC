<template lang="pug">
  #DashBoard
    v-container
      v-row.text-center
        v-col.mb-12
          h4(class="display-2 font-weight-bold mb-3") Welcome to GraphDB
          span(class="red--text" v-if="info != null") {{ info }}
    v-container
      v-row
        v-col.mb-6
          v-card(class="mx-auto" max-width="300" tile)
            v-list(flat v-if="reps != null")
              v-subheader Repositories
              v-list-item-group(v-model="item" color="primary")
                v-list-item(v-for="(rep, i) in reps" :key="i")
                  v-list-item-icon
                    v-icon mdi-book
                  v-list-item-content
                    v-list-item-title(v-text="rep")
            v-list(flat v-else)
              v-subheader Repositories
              v-list-item-group(v-model="item" color="grey")
                v-list-item(disabled)
                  v-list-item-icon
                    v-icon mdi-book
                  v-list-item-content
                    v-list-item-title None repositories
        v-col.mb-6
          v-textarea(
            solo
            name="input-7-4"
            rows="10"
            label="Write your query..."
            v-model="query"
          )
    .text-center
      v-row
        v-col.mb-5
        v-col.mb-1
          v-btn(rounded color="primary" dark v-on:click="runQuery") Run Query
        v-col.mb-1
          v-btn(rounded color="grey" dark @click="query=null") Clear Query
        v-col.mb-5
    v-row(
      class="mb-12"
      no-gutters
    )
      v-col(lg="1")
      v-col(md="10")
        v-card
          v-card-title Results
            v-spacer
            v-text-field(
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            )
          v-data-table(
            :headers="headers"
            :items="data_info"
            :search="search"
          )
      v-col(lg="1")
    .text-center(v-if="data_info.length !== 0")
      v-btn(rounded color="black" dark @click="saveData") Download (JSON)
      VueJsonToCsv(
        :json-data="data_info"
        csv-title="result"
      )
        v-btn(rounded color="green" dark) Download (CSV)
    br
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'
export default {
  name: 'DashBoard',
  components: {
    VueJsonToCsv
  },
  data: () => ({
    reps: null,
    item: 1,
    query: null,
    result: null,
    info: null,
    search: null,
    headers: [],
    data_info: []
  }),
  created () {
    this.axios.get('/repositories')
      .then(dados => {
        this.reps = dados.data
        this.info = null
      })
      .catch(error => {
        this.info = error
      })
  },
  methods: {
    runQuery: async function (event) {
      if (this.query != null && this.reps != null) {
        await this.axios.get(`/repositories/${this.reps[this.item]}?query=${this.query}`)
          .then(dados => {
            this.result = dados.data
            /*eslint-disable */
            let headers = []
            let data_info = []
            for (let i = 0; i < dados.data.head.vars.length; i++) {
              let temp = {}
              if (i === 0) {
                temp = {
                  text: dados.data.head.vars[i],
                  align: 'center',
                  sortable: true,
                  value: dados.data.head.vars[i]
                }
              } else {
                temp = { text: dados.data.head.vars[i], value: dados.data.head.vars[i] }
              }
              headers.push(temp)
            }
            this.headers = headers
            dados.data.results.bindings.map(row => {
                let temp = {}
                dados.data.head.vars.map(column => { 
                    const type = row[column].type
                    const value = row[column].value;
                    temp[column] = value 
                })
                data_info.push(temp)
            })
            this.info = null
            this.data_info = data_info
          })
          .catch(error => {
            this.info = error
          })
      } else {
        this.info = 'Dados inválidos...'
      }
    },
    saveData: async function(event) {
      const data = JSON.stringify(this.result)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "result.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
  }
}
</script>
