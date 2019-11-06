import TMDb from '@/models/TMDb'
const db = new TMDb()

export default {
	namespaced: true,
	state: {
		movies: [],
		sort: 'desc'
	},
	getters: {
	},
	mutations: {
		set(state, movies){
			state.movies = movies.map( ({id, poster_path, title}) => {
				return {
					id, 
					image: `https://image.tmdb.org/t/p/w500/${poster_path}`, 
					title
				}
			} )
		},
		changeSort(state, sortType){
			state.sort = sortType
		}
	},
	actions: {
		get({ state, commit }, {page = 1} = {}){
			const sort = state.sort

			db.fetch({page, sort})
			.then( res => {
				const movies = res.results
				commit('set', movies)
			} )
		},
		changeSort( {commit, dispatch}, sortType){
			commit('changeSort', sortType)
			dispatch('get')
		}
	}
}