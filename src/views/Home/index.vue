<template>
    <div class="wrapper">
        <div class="filters">
            По популярности: 
            <a-switch 
                class="filters__switch" 
                defaultChecked
                @change="handleFilterChange"
            >
                <a-icon type="check" slot="checkedChildren" />
                <a-icon type="close" slot="unCheckedChildren" />
            </a-switch>
        </div>
        <a-row
            class="wrapper__cards"
            :gutter="16"
            type="flex"
        >
            <a-col
                v-for="(item) in movies"
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
        <a-pagination 
            v-model="currentPage" 
            :pageSize="cardsPerPage"
            :total="totalCards"
        />
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
.filters {
    display: flex;
    justify-content: flex-end;
    padding: 30px 0;
    &__switch {
        margin-left: 15px;
    }
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Card from '@/components/Card'

const { mapState: mapMoviesState, mapActions: mapMoviesActions } = createNamespacedHelpers('movies')
export default {
    components: {
        Card
    },
    data(){
        return {
            currentPage: 1,
            cardsPerPage: 20,
            totalCards: 100
        }
    },
    computed: {
        ...mapMoviesState([
            'movies'
        ])
    },
    methods: {
        ...mapMoviesActions({
            getMovies: 'get',
            changeSort: 'changeSort'
        }),
        handleFilterChange(checked){
            const type = checked ? 'desc' : 'asc'
            this.changeSort(type)
        }
    },
    watch: {
      currentPage(val) {
        this.getMovies({page: val})
      }
    }
}
</script>