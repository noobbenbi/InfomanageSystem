<template>
  <div class="about container">
    <div v-html="msg"></div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg:'<a href="./static/index.html">A</a>'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
