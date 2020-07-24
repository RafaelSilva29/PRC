<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            contain
            alt="Cinema logo" 
            src="./assets/images/icon.png" 
            transition="scale-transition"
            width="50"
          />
        </router-link>
      </div>
      <v-btn
        href="/"
        text
      >
        <span class="mr-2 grey--text">Cinemateca</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        href="/pessoas"
        text
      >
        <span class="mr-2 grey--text">Pessoas</span>
      </v-btn>
      <v-btn
        href="/personagens"
        text
      >
        <span class="mr-2 grey--text">Personagens</span>
      </v-btn>
      <v-btn
        href="/generos"
        text
      >
        <span class="mr-2 grey--text">Géneros</span>
      </v-btn>
      <v-btn
        href="/paises"
        text
      >
        <span class="mr-2 grey--text">Paises</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <strong>Cinemateca de PRC </strong> - {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
