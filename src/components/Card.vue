<template>
    <div class="card">
        <div class="card__image">
            <img v-if="image != ''" class="card__image" :src="image" :alt="title">
            <a-icon class="not-image" v-else type="warning" />
            <div class="card__actions">
                <a-icon 
                    v-if="isFav(String(id))" 
                    class="actions-icon favorite-remove" type="minus-circle" 
                    @click="() => removeFavorite(String(id))"
                />
                <a-icon 
                    v-else 
                    class="actions-icon favorite-add" type="plus-circle" 
                    @click="() => addFav(String(id))"
                />
            </div>
        </div>
        
        <div 
            class="card__title"
            :class="{'fav' : isFav(String(id))}"
        >
            {{ title }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-shadow: -4px 2px 11px 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    overflow: hidden;
    &__image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #fff;
        position: relative;
        img {
            width: 100%;
        }
        .not-image {
            padding: 100px 15px;
            font-size: 60px;
        }
    }
    &__actions {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transform: scale(1.2);
        transition: all 0.3s ease-in-out;
    }
    &:hover &__actions {
        opacity: 1;
        transform: scale(1);
    }
    &__title {
        padding: 15px;
        transition: all 0.3s ease-in-out;
        flex: 1;
        &.fav {
            background-color: rgb(255, 183, 75)
        }
    }
    .actions-icon {
        font-size: 30px;
        color: #fff;
    }
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'
import img from '@/assets/default.jpg'

const { mapState: mapFavoritesState, mapActions: mapFavoritesActions } = createNamespacedHelpers('favorites')
export default {
    props: {
        id: {
            type: Number
        },
        image: {
            type: String,
            default: img
        },
        title: {
            type: String,
            default: 'Нет названия'
        }
    },
    data(){
        return {
            currentPage: 1,
            cardsPerPage: 20,
            totalCards: 100
        }
    },
    computed: {
        ...mapFavoritesState([
            'favorites'
        ])
    },
    methods: {
        ...mapFavoritesActions({
            addFavorite: 'add',
            removeFavorite: 'remove'
        }),
        isFav(id){
            window.console.log(id, this.favorites)
            return this.favorites.includes(id)
        },
        addFav(id){
            this.addFavorite(id)
            this.$message.success('Добавлено в избранное!')
        }
    }
}
</script>