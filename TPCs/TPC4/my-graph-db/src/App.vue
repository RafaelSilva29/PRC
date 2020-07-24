<template lang="pug">
  v-app
    v-app-bar(app color="dark")
      div(class="d-flex align-center")
        a(href="/")
          v-img(
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="./assets/GraphDB.png"
            transition="scale-transition"
            width="120"
          )
    br
    br
    br
    br
    router-view
    v-footer(padless)
      v-col(class="text-center" cols="12")
        strong {{ this.date }} — GraphDB
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    date: new Date().getFullYear()
  })
}
</script>
