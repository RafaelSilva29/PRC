<template lang="pug">
  div.home
    DashBoard(msg="Welcome to Your Vue.js App")
</template>

<script>
// @ is an alias to /src
import DashBoard from '@/components/DashBoard.vue'

export default {
  name: 'Home',
  components: {
    DashBoard
  }
}
</script>
