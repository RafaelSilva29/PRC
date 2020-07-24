<template>
  <div class="home">
    <ListaFilmes/>
  </div>
</template>

<script>
import ListaFilmes from '@/components/ListaFilmes.vue'

export default {
  name: 'Home',
  components: {
    ListaFilmes
  }
}
</script>
