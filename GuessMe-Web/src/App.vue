<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import indexPage from '@/components/index-page/index-page'
  import store from '@/store'
  export default {
    name: 'app',
    components: {
      'index-page': indexPage
    },
    store
  }
</script>

<style scoped>
  #app{
    color: #666;
  }
</style>
