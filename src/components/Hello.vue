<template>
  <div class="user">
    <template>
      <el-button type="text" @click="open3">点击打开 Message Box</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
