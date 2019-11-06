<template>
  <a-layout id="layout">
    <a-layout-header class="header">
      <div class="logo">
        IMDb
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        :selectedKeys="[menuCurrentKey]"
        @click="handleMenuChange"
      >
        <a-menu-item key="home">Главная</a-menu-item>
        <a-menu-item key="favorites">Избранное</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
#layout {
  min-height: 100vh;
}
.logo {
  float: left;
  color: #fff;
  font-size: 30px;
  margin-right: 60px;
}

.content {
  padding: 20px;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapMoviesActions } = createNamespacedHelpers('movies')
const { mapMutations: mapFavoritesMutations } = createNamespacedHelpers('favorites')

export default {
  data(){
    return {

    }
  },
  computed: {
    menuCurrentKey(){
      return this.$route.name || 'home'
    }
  },
  methods: {
    handleMenuChange({key}){
      this.$router.push({name: key})
    },
    ...mapMoviesActions({
      getMovies: 'get'
    }),
    ...mapFavoritesMutations({
      getFavorites: 'read'
    })
  },
  mounted(){
    this.getFavorites()
    this.getMovies()
  }
}
</script>
