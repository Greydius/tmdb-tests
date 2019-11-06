<template>
    <div 
        v-if="favoriteMovies.length > 0"
        class="wrapper"
    >
        <a-row
            class="wrapper__cards"
            :gutter="16"
            type="flex"
        >
            <a-col
                v-for="(item) in favoriteMovies"
                :key="item.id"
                :xs="24"
                :lg="6"
                class="wrapper__card"
            >
                <Card 
                    :id="item.id" 
                    :title="item.title" 
                    :image="item.image" 
                />
            </a-col>
        </a-row>
    </div>
    <div class="empty" v-else>
        <span>Пусто! Сначало добавьте фильмы в избранное!</span>
        <router-link :to="{name: 'home'}">Перейти</router-link>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    &__cards {
        flex: 1;
        margin-bottom: 30px;
    }
    &__card {
        margin-bottom: 16px;
    }
}
.empty {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 30px;
    font-size: 30px;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Card from '@/components/Card'

const { mapState: mapMoviesState, mapActions: mapMoviesActions } = createNamespacedHelpers('movies')
const { mapState: mapFavoritesState } = createNamespacedHelpers('favorites')
export default {
    components: {
        Card
    },
    data(){
        return {
        }
    },
    computed: {
        ...mapMoviesState([
            'movies'
        ]),
        ...mapFavoritesState([
            'favorites'
        ]),
        favoriteMovies(){
            return this.movies.filter( ({id}) => this.favorites.includes(String(id)))
        }
    },
    methods: {
        ...mapMoviesActions({
            getMovies: 'get'
        })
    },
    watch: {
      currentPage(val) {
        this.getMovies({page: val})
      }
    }
}
</script>